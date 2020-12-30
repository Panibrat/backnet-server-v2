import { createSelector } from '@reduxjs/toolkit';

export const getRoot = state => state;

export const getAVs = createSelector(getRoot, root => root.av);
export const getAIs = createSelector(getRoot, root => root.ai);
export const getAOs = createSelector(getRoot, root => root.ao);
export const getBIs = createSelector(getRoot, root => root.bi);
export const getBOs = createSelector(getRoot, root => root.bo);
export const getBVs = createSelector(getRoot, root => root.bv);

export const getAVbyId = id => createSelector(getAVs, avs => avs[id]);
export const getAIbyId = id => createSelector(getAIs, ais => ais[id]);
export const getAObyId = id => createSelector(getAOs, aos => aos[id]);
export const getBIbyId = id => createSelector(getBIs, bis => bis[id]);
export const getBObyId = id => createSelector(getBOs, bos => bos[id]);
export const getBVbyId = id => createSelector(getBVs, bvs => bvs[id]);

export const getPlans = createSelector(getRoot, root => root.plans);
export const getActiveArea = createSelector(getPlans, plans => plans.activeArea);

export const getModbus = createSelector(getRoot, root => root.modbus);
// export const getModbusPointById = id => createSelector(getModbus, points => points[id]);
export const getModbusPointById = id => createSelector(getRoot, root => root.modbus[id]);
export const getL1 = createSelector(getRoot, root => root.modbus['L1N']);
