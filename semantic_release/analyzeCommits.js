'use strict';

var parseCommitConventionalMessage = require("conventional-commits-parser").sync;

var MAJOR_BUMP = 'major';
var MINOR_BUMP = 'minor';
var PATCH_BUMP = 'patch';
var MAJOR_TYPES = [];
var MINOR_TYPES = ['feat', 'perf'];
var PATCH_TYPES = ['fix', 'refactor', 'revert'];

var MAJOR_BUMP_NOTE_KEYWORDS = Object.freeze([
  'BREAKING CHANGE',

  'BUMP MAJOR',
  'BUMP X.0.0',

  'BUMP MINOR',
  'BUMP 0.X.0',

  'BUMP PATCH',
  'BUMP 0.0.X'
]);
var PARSE_OPTIONS = {noteKeywords: MAJOR_BUMP_NOTE_KEYWORDS};

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

function isMajorCommitType(commit, patchTypes) {
  if (patchTypes.includes(commit.type)) return true;

  var notes = commit.notes;
  for (var i = 0; i < notes.length; i++) {
    var note = notes[i];
    var noteTitle = note.title.toUpperCase();
    if (MAJOR_BUMP_NOTE_KEYWORDS.includes(noteTitle)) return true;
  }
  return false;
}

function isMinorCommitType(commit, minorTypes) {
  return minorTypes.includes(commit.type);
}

function isPatchCommitType(commit, patchTypes) {
  return patchTypes.includes(commit.type);
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
