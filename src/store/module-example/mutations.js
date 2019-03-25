/*
export function someMutation (state) {
}
*/

'use strict';

export function updateOwnerEmail(state, ownerEmail) {
  state.ownerEmail = ownerEmail;
}

export function updateUserEmail(state, userEmail) {
  state.userEmail = userEmail;
}

export function updateCloseNotify(state, closeNotify) {
  state.closeNotify = closeNotify;
}

export function updateSelectedTeamName(state, selectedTeamName) {
  state.selectedTeamName = selectedTeamName;
}

export function updateSelectedTeamOwner(state, selectedTeamOwner) {
  state.selectedTeamOwner = selectedTeamOwner;
}
