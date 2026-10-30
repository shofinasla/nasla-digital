import React from 'react';
import { VisionMissionConfig, Milestone, TeamMember } from '../../types';
import { Users, Sparkles, Plus, Trash2 } from 'lucide-react';

interface AboutManagerProps {
  visionMission: VisionMissionConfig;
  milestones: Milestone[];
  teamMembers: TeamMember[];
  onUpdateVisionMission: (vm: VisionMissionConfig) => void;
  onUpdateMilestones: (milestones: Milestone[]) => void;
  onUpdateTeam: (team: TeamMember[]) => void;
}

export const AboutManager: React.FC<AboutManagerProps> = ({
  visionMission,
  milestones,
  teamMembers,
  onUpdateVisionMission,
  onUpdateMilestones,
  onUpdateTeam,
}) => {
  return (
    <div className="space-y-6 animate-fadeIn">
      <div>
        <h2 className="text-xl font-bold text-white font-heading flex items-center gap-2">
          <Users className="w-5 h-5 text-blue-400" />
          <span>Tentang Perusahaan, Visi Misi & Tim</span>
        </h2>
        <p className="text-xs text-slate-400 mt-1">
          Atur visi, misi, nilai utama, perjalanan usaha, dan profil tim pendiri.
        </p>
      </div>

      {/* Vision & Mission Card */}
      <div className="p-5 rounded-2xl bg-slate-800/80 border border-slate-700 space-y-4">
        <h3 className="text-sm font-bold text-cyan-300">Visi & Misi Usaha:</h3>

        <div>
          <label className="text-xs font-bold text-slate-300 block mb-1">Pernyataan Visi</label>
          <textarea
            rows={2}
            value={visionMission.visionText}
            onChange={(e) =>
              onUpdateVisionMission({ ...visionMission, visionText: e.target.value })
            }
            className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white"
          ></textarea>
        </div>

        <div>
          <label className="text-xs font-bold text-slate-300 block mb-1">
            Poin Misi Perusahaan (3 Poin)
          </label>
          <div className="space-y-2">
            {visionMission.missions.map((m, idx) => (
              <input
                key={idx}
                type="text"
                value={m}
                onChange={(e) => {
                  const updated = [...visionMission.missions];
                  updated[idx] = e.target.value;
                  onUpdateVisionMission({ ...visionMission, missions: updated });
                }}
                className="w-full px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-xs text-white"
              />
            ))}
          </div>
        </div>
      </div>

      {/* Milestones Card */}
      <div className="p-5 rounded-2xl bg-slate-800/80 border border-slate-700 space-y-3">
        <h3 className="text-sm font-bold text-cyan-300">Roadmap / Perjalanan Usaha:</h3>
        <div className="space-y-3">
          {milestones.map((ms, idx) => (
            <div key={ms.id || idx} className="p-3 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={ms.year}
                  onChange={(e) => {
                    const updated = [...milestones];
                    updated[idx].year = e.target.value;
                    onUpdateMilestones(updated);
                  }}
                  className="w-24 px-2 py-1 rounded bg-slate-800 border border-slate-700 text-xs font-bold text-cyan-300 font-mono"
                />
                <input
                  type="text"
                  value={ms.title}
                  onChange={(e) => {
                    const updated = [...milestones];
                    updated[idx].title = e.target.value;
                    onUpdateMilestones(updated);
                  }}
                  className="flex-1 px-2 py-1 rounded bg-slate-800 border border-slate-700 text-xs text-white"
                />
              </div>
              <textarea
                rows={1}
                value={ms.description}
                onChange={(e) => {
                  const updated = [...milestones];
                  updated[idx].description = e.target.value;
                  onUpdateMilestones(updated);
                }}
                className="w-full px-2 py-1 rounded bg-slate-800 border border-slate-700 text-xs text-slate-300"
              ></textarea>
            </div>
          ))}
        </div>
      </div>

      {/* Team Members */}
      <div className="p-5 rounded-2xl bg-slate-800/80 border border-slate-700 space-y-3">
        <h3 className="text-sm font-bold text-cyan-300">Profil Anggota Tim:</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {teamMembers.map((member, idx) => (
            <div key={member.id} className="p-3 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
              <div className="grid grid-cols-2 gap-2">
                <input
                  type="text"
                  value={member.name}
                  onChange={(e) => {
                    const updated = [...teamMembers];
                    updated[idx].name = e.target.value;
                    onUpdateTeam(updated);
                  }}
                  placeholder="Nama Lengkap"
                  className="w-full px-2 py-1 rounded bg-slate-800 border border-slate-700 text-xs text-white font-bold"
                />
                <input
                  type="text"
                  value={member.role}
                  onChange={(e) => {
                    const updated = [...teamMembers];
                    updated[idx].role = e.target.value;
                    onUpdateTeam(updated);
                  }}
                  placeholder="Jabatan"
                  className="w-full px-2 py-1 rounded bg-slate-800 border border-slate-700 text-xs text-cyan-300"
                />
              </div>
              <textarea
                rows={2}
                value={member.bio}
                onChange={(e) => {
                  const updated = [...teamMembers];
                  updated[idx].bio = e.target.value;
                  onUpdateTeam(updated);
                }}
                placeholder="Bio singkat"
                className="w-full px-2 py-1 rounded bg-slate-800 border border-slate-700 text-xs text-slate-300"
              ></textarea>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
