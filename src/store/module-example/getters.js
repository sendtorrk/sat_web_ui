'use strict';

export function getOwnerEmail(state) {
  return state.ownerEmail;
}

export function getUserEmail(state) {
  return state.userEmail;
}

export function getCloseNotify(state) {
  return state.closeNotify;
}

export function getSelectedTeamId(state) {
  return state.selectedTeamId;
}

export function getSelectedTeamName(state) {
  return state.selectedTeamName;
}

export function getSelectedTeamOwner(state) {
  return state.selectedTeamOwner;
}

export function getSelectedAssetId(state) {
  return state.selectedAssetId;
}