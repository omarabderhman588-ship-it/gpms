import {
  acceptInvitationService,
  approveJoinRequestService,
  approveSupervisorRequestService,
  createInvitationService,
  createJoinRequestService,
  createSupervisorRequestService,
  createTeamService,
  declineInvitationService,
  declineSupervisorRequestService,
  deleteTeamService,
  getMyTeamStateService,
  getTeamByIdService,
  joinTeamByCodeService,
  leaveTeamService,
  listTeamsService,
  rejectJoinRequestService,
  removeTeamMemberService,
  updateTeamService,
} from "./teams.service.js";

export async function listTeams(req, res) {
  const result = await listTeamsService(req.user, req.validated.query);
  res.json({ ok: true, data: result });
}

export async function getMyTeamState(req, res) {
  const result = await getMyTeamStateService(req.user);
  res.json({ ok: true, data: result });
}

export async function getTeamById(req, res) {
  const result = await getTeamByIdService(req.user, req.validated.params.id);
  res.json({ ok: true, data: result });
}

export async function createTeam(req, res) {
  const result = await createTeamService(req.user, req.validated.body);
  res.status(201).json({ ok: true, data: result });
}

export async function updateTeam(req, res) {
  const result = await updateTeamService(req.user, req.validated.params.id, req.validated.body);
  res.json({ ok: true, data: result });
}

export async function deleteTeam(req, res) {
  const result = await deleteTeamService(req.user, req.validated.params.id);
  res.json({ ok: true, data: result });
}

export async function joinTeamByCode(req, res) {
  const result = await joinTeamByCodeService(req.user, req.validated.body.inviteCode);
  res.json({ ok: true, data: result });
}

export async function createJoinRequest(req, res) {
  const result = await createJoinRequestService(req.user, req.validated.params.id, req.validated.body);
  res.status(201).json({ ok: true, data: result });
}

export async function approveJoinRequest(req, res) {
  const result = await approveJoinRequestService(req.user, req.validated.params.id);
  res.json({ ok: true, data: result });
}

export async function rejectJoinRequest(req, res) {
  const result = await rejectJoinRequestService(req.user, req.validated.params.id);
  res.json({ ok: true, data: result });
}

export async function createInvitation(req, res) {
  const result = await createInvitationService(req.user, req.validated.params.id, req.validated.body);
  res.status(201).json({ ok: true, data: result });
}

export async function createSupervisorRequest(req, res) {
  const result = await createSupervisorRequestService(req.user, req.validated.params.id, req.validated.body);
  res.status(201).json({ ok: true, data: result });
}

export async function acceptInvitation(req, res) {
  const result = await acceptInvitationService(req.user, req.validated.params.id);
  res.json({ ok: true, data: result });
}

export async function approveSupervisorRequest(req, res) {
  const result = await approveSupervisorRequestService(req.user, req.validated.params.id);
  res.json({ ok: true, data: result });
}

export async function declineInvitation(req, res) {
  const result = await declineInvitationService(req.user, req.validated.params.id);
  res.json({ ok: true, data: result });
}

export async function declineSupervisorRequest(req, res) {
  const result = await declineSupervisorRequestService(req.user, req.validated.params.id);
  res.json({ ok: true, data: result });
}

export async function leaveTeam(req, res) {
  const result = await leaveTeamService(req.user, req.validated.params.id);
  res.json({ ok: true, data: result });
}

export async function removeTeamMember(req, res) {
  const result = await removeTeamMemberService(
    req.user,
    req.validated.params.id,
    req.validated.params.userId,
  );
  res.json({ ok: true, data: result });
}
