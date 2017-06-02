'use strict';

var parseCommitConventionalMessage = require("conventional-commits-parser").sync;

var MAJOR_BUMP = 'major';
var MINOR_BUMP = 'minor';
var PATCH_BUMP = 'patch';
var MAJOR_TYPES = [];
var MINOR_TYPES = ['feat', 'perf'];
var PATCH_TYPES = ['fix', 'refactor', 'revert'];

var MINOR_BUMP_NOTE_KEYWORDS = [
  'BUMP MINOR',
  'BUMP 0.X.0',
];

var PATCH_BUMP_NOTE_KEYWORDS = [
  'BUMP PATCH',
  'BUMP 0.0.X'
];

var MAJOR_BUMP_NOTE_KEYWORDS = [
  'BREAKING CHANGE',
  'BUMP MAJOR',
  'BUMP X.0.0'
];

var NOTE_KEYWORDS = [
  MAJOR_BUMP_NOTE_KEYWORDS,
  MINOR_BUMP_NOTE_KEYWORDS,
  PATCH_BUMP_NOTE_KEYWORDS
].reduce(function (accum, current) {
  return accum.concat(current);
}, []);

var PARSE_OPTIONS = {noteKeywords: NOTE_KEYWORDS};

function getTypesConfigFromPackageJson(packageJson) {
  try {
    var typesForAnalyzeCommits = packageJson.config.dvAnalyzeCommits;
    return {
      major: typesForAnalyzeCommits.majorTypes || MAJOR_TYPES,
      minor: typesForAnalyzeCommits.minorTypes || MINOR_TYPES,
      patch: typesForAnalyzeCommits.patchTypes || PATCH_TYPES
    };
  }
  catch (err) {
    return {
      major: MAJOR_TYPES,
      minor: MINOR_TYPES,
      patch: PATCH_TYPES
    };
  }
}

function checkCommitTypeAndNotes(commit, patchTypes, noteKeywords) {
  if (patchTypes.includes(commit.type)) return true;
  var notes = commit.notes;
  for (var i = 0; i < notes.length; i++) {
    var note = notes[i];
    var noteTitle = note.title.toUpperCase();
    if (noteKeywords.includes(noteTitle)) return true;
  }
  return false;
}

function isMajorCommitType(commit, majorTypes) {
  return checkCommitTypeAndNotes(commit, majorTypes, MAJOR_BUMP_NOTE_KEYWORDS);
}

function isMinorCommitType(commit, minorTypes) {
  return checkCommitTypeAndNotes(commit, minorTypes, MINOR_BUMP_NOTE_KEYWORDS);
}

function isPatchCommitType(commit, patchTypes) {
  return checkCommitTypeAndNotes(commit, patchTypes, PATCH_BUMP_NOTE_KEYWORDS);
}

module.exports = function (pluginConfig, config, cb) {
  var commits = (config.commits || []);
  var typesConfigSetting = getTypesConfigFromPackageJson(config.pkg);

  var type = null;
  commits.every(function (commit) {
    var parsedCommit = parseCommitConventionalMessage(commit.message, PARSE_OPTIONS);

    if (isMajorCommitType(parsedCommit, typesConfigSetting.major)) {
      type = MAJOR_BUMP;
      return false;
    } else if (MINOR_BUMP === parsedCommit.type) {
      return true;
    } else if (isPatchCommitType(parsedCommit, typesConfigSetting.patch)) {
      type = PATCH_BUMP;
    } else if (isMinorCommitType(parsedCommit, typesConfigSetting.minor)) {
      type = MINOR_BUMP;
    }

    return true;
  });

  cb(null, type);
};
