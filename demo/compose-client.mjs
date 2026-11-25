// Reinsert local view declarations in their original lexical scope, once at server startup.
import {catalog} from '../core/model.mjs';
import { readFile } from 'node:fs/promises';
const views = [
  "Workflow",
  "WorkflowStudio",
  "TrendChart",
  "ResponsiveTrend",
  "MobileTrend",
  "Icon",
  "Brand",
  "EmptyState",
  "CityIllustration",
  "TaskDialog",
  "SupervisorSchedule",
  "SupervisorFilter",
  "Commitment",
  "Supervisor",
  "Assignment",
  "PersianDate",
  "FieldGlyph",
  "FieldIcon",
  "RecordFormRouter",
  "PersonForm",
  "RecordForm",
  "LegacyDialog",
  "RecordDialog",
  "SupervisorDialog",
  "RecordDetail",
  "PalettePicker",
  "Avatar",
  "Account",
  "DetailButton",
  "WeekLoad",
  "DayBrief",
  "TownBuilding",
  "ListingsTown",
  "ListingPreview",
  "ListingsView",
  "TaskCreateButton",
  "HomePanel",
  "Home",
  "Records",
  "Groups",
  "PageTitle",
  "TeamManagement",
  "Reports",
  "Audit",
  "Desk",
  "PasswordDialog",
  "Login"
];
export async function composeClient() {
  const read = file => readFile(new URL('./public/' + file, import.meta.url), 'utf8');
  const template = await read('app.js');
  const parts = template.split(/\/\* @demo-view:(\w+) \*\//g);
  const remaining = new Set(views);
  for (let i = 1; i < parts.length; i += 2) {
    const name = parts[i];
    if (!remaining.delete(name)) throw Error('Unknown or duplicate demo view: ' + name);
    parts[i] = await read('components/views/' + name + '.js');
    if (name === 'RecordForm') parts[i] += '\nfunction demandFormModel(){return '+JSON.stringify(catalog.demands)+';}';
    if (name === 'RecordForm') parts[i] += '\nfunction physicalPropertyModel(){return '+JSON.stringify(catalog.properties)+';}';
    if (name === 'RecordForm') parts[i] += '\n' + await read('components/views/PropertyForm.js');
    if (name === 'Records') parts[i] += '\n' + await read('components/views/MaskanProperties.js');
    if (name === 'RecordDetail') parts[i] += '\n' + await read('components/views/TaskDetail.js');
  }
  if (remaining.size) throw Error('Missing demo view markers: ' + [...remaining].join(', '));
  return Buffer.from(parts.join(''));
}
