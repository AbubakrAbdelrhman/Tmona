/*
  MEDLOG starter application.
  1) Deploy Code.gs as a Google Apps Script web app.
  2) Paste the deployment URL into GAS_WEB_APP_URL below.
  3) Publish this folder using GitHub Pages.
*/const GAS_WEB_APP_URL = "https://script.google.com/macros/s/AKfycbyqKDzQyHc5CnGt693M93evSvoRz8PuiZLOypRVps3PLbBzG4cXjSjcootCOe41BPBj/exec";

const formConfigs = {
  initial: {
    title: "New DLOC assessment",
    subtitle: "Initial assessment · Decreased Level of Consciousness",
    sections: [
      {title:"Case identification",desc:"Use a non-identifying code. Do not enter patient names or hospital identifiers.",fields:[
        f("caseId","Unique Case ID","text",{required:true,placeholder:"e.g. DLOC-2026-001",hint:"Use the same ID for every follow-up and final outcome."}),
        f("assessmentDate","Assessment date","date",{required:true}),
        f("assessmentTime","Assessment time","time",{required:true}),
        f("age","Patient age","number",{min:0,placeholder:"Age"}),
        f("ageUnit","Age unit","radio",{options:["Years","Months","Days","Unknown","N/A"]}),
        f("sex","Sex","radio",{options:["Male","Female","Other","Unknown","N/A"]}),
        f("arrival","Mode of arrival","radio",{options:["Ambulance","Private vehicle","Walk-in","Wheelchair","Stretcher","Referred from another facility","Other","Unknown"]}),
        f("historySource","Source of history","check",{options:["Patient","Relative","Caregiver","EMS / Ambulance","Witness / Bystander","Medical records","Other","Unknown","N/A"]}),
        f("historyReliability","Reliability of history","radio",{options:["Reliable","Partially reliable","Unreliable","Unknown","N/A"]})
      ]},
      {title:"Presenting complaint & history",desc:"Record the onset and course as accurately as possible, including Last Known Well when relevant.",fields:[
        f("onset","Onset of altered consciousness","radio",{options:["Sudden","Gradual","Unknown","N/A"]}),
        f("lkwDate","Last Known Well – date","date"),
        f("lkwTime","Last Known Well – time","time"),
        f("duration","Duration of altered consciousness","text",{placeholder:"e.g. 2 hours, since yesterday"}),
        f("course","Clinical course","radio",{options:["Improving","Worsening","Fluctuating","Persistent / unchanged","Unknown","N/A"]}),
        f("symptoms","Associated symptoms","check",{options:["Fever","Headache","Vomiting","Nausea","Seizure activity","Head trauma","Limb weakness","Facial asymmetry","Speech disturbance","Dizziness","Chest pain","Dyspnea","Palpitations","Visual disturbance","Neck stiffness","Abnormal movements","Other","None reported","Unknown","N/A"]}),
        f("previousEpisodes","Previous similar episodes","radio",{options:["Yes","No","Unknown","N/A"]}),
        f("hpiNotes","Additional history of present illness","textarea",{placeholder:"Brief relevant history…"})
      ]},
      {title:"Relevant medical & drug history",fields:[
        f("medicalHistory","Known medical conditions","check",{options:["Diabetes mellitus","Hypertension","Epilepsy","Previous stroke / TIA","Ischemic heart disease","Heart failure","Arrhythmia","Chronic liver disease","Renal disease","Psychiatric illness","Neurological disease","Malignancy","Other","No known medical conditions","Unknown","N/A"]}),
        f("medications","Current medications","textarea",{hint:"Especially insulin, hypoglycemics, anticoagulants, sedatives, opioids and antiepileptics."}),
        f("exposure","Recent alcohol / drug / toxin exposure","radio",{options:["Alcohol","Recreational drugs","Medication overdose / toxic exposure","Suspected exposure","No known exposure","Unknown","N/A"]}),
        f("exposureDetails","Exposure details","textarea"),
        f("allergies","Known allergies","radio",{options:["No known allergies","Known allergies","Unknown","N/A"]}),
        f("allergyDetails","Allergy details","text"),
        f("surgery","Relevant previous surgery","textarea")
      ]},
      {title:"Initial assessment – ABCDE",desc:"Complete after or alongside immediate stabilization. Do not delay emergency treatment to complete this form.",fields:[
        f("airway","A – Airway status","radio",{options:["Patent","Threatened","Compromised","Obstructed","Advanced airway in place","Not assessed"]}),
        f("airwayInterventions","Airway interventions","check",{options:["Airway positioning","Suction","Oropharyngeal airway","Nasopharyngeal airway","Endotracheal intubation","Other","None","N/A"]}),
        f("rr","B – Respiratory rate (breaths/min)","number"),
        f("spo2","Oxygen saturation – SpO₂ (%)","number",{min:0,max:100}),
        f("breathing","Breathing pattern","radio",{options:["Normal","Tachypnea","Bradypnea","Apnea","Irregular","Laboured","Other","Not assessed"]}),
        f("oxygenSupport","Oxygen / respiratory support","radio",{options:["Room air","Nasal cannula","Simple face mask","Non-rebreather mask","Bag-valve-mask","Mechanical ventilation","Other","N/A","Not assessed"]}),
        f("oxygenFlow","Oxygen flow rate (L/min)","number"),
        f("bp","C – Blood pressure (mmHg)","text",{placeholder:"e.g. 120/80"}),
        f("hr","Heart rate (beats/min)","number"),
        f("pulse","Pulse characteristics","radio",{options:["Regular","Irregular","Weak","Bounding","Not assessed","N/A"]}),
        f("perfusion","Peripheral perfusion","radio",{options:["Normal","Delayed capillary refill","Poor peripheral perfusion","Cold extremities","Other","Not assessed"]}),
        f("avpu","D – AVPU","radio",{options:["A – Alert","V – Responds to Voice","P – Responds to Pain","U – Unresponsive","Not assessed"]}),
        f("gcsE","GCS – Eye response","radio",{options:["E4 – Spontaneous","E3 – To sound","E2 – To pressure","E1 – No response","NT – Not testable","Not assessed"]}),
        f("gcsV","GCS – Verbal response","radio",{options:["V5 – Oriented","V4 – Confused","V3 – Inappropriate words","V2 – Incomprehensible sounds","V1 – No response","NT – Not testable","Not assessed"]}),
        f("gcsM","GCS – Motor response","radio",{options:["M6 – Obeys commands","M5 – Localizes pressure","M4 – Withdraws from pressure","M3 – Abnormal flexion","M2 – Extension","M1 – No response","NT – Not testable","Not assessed"]}),
        f("gcsTotal","Total GCS (3–15, only if all components testable)","number",{min:3,max:15}),
        f("gcsNTReason","Reason for non-testable GCS component","check",{options:["Intubation","Sedation","Paralysis","Facial / ocular injury","Language barrier","Other","N/A"]}),
        f("rbs","Random blood glucose","number"),
        f("glucoseUnit","Blood glucose unit","radio",{options:["mg/dL","mmol/L"]}),
        f("temperature","E – Temperature (°C)","number"),
        f("exposureFindings","Exposure / examination findings","check",{options:["Head trauma","Other external trauma","Rash","Needle marks","Dehydration","Jaundice","Cyanosis","Other","None","Not assessed"]}),
        f("abcdeNotes","Additional ABCDE findings","textarea")
      ]},
      {title:"Focused neurological examination",fields:[
        f("pupilsSymmetry","Pupillary symmetry","radio",{options:["Equal","Unequal","Not assessed"]}),
        f("rightPupil","Right pupil size (mm)","number"),
        f("leftPupil","Left pupil size (mm)","number"),
        f("pupilReaction","Pupillary light reaction","radio",{options:["Both reactive","Right sluggish / non-reactive","Left sluggish / non-reactive","Both sluggish","Both fixed / non-reactive","Not assessed"]}),
        f("limbMovement","Limb movement","radio",{options:["Symmetrical","Asymmetrical","Reduced movement","No movement","Not assessed"]}),
        f("focalDeficit","Focal neurological deficit","radio",{options:["Present","Absent","Suspected","Not assessed"]}),
        f("neckStiffness","Neck stiffness","radio",{options:["Present","Absent","Not assessed"]}),
        f("posturing","Abnormal posturing","check",{options:["Decorticate","Decerebrate","Other","None","Not assessed"]}),
        f("seizureActivity","Clinical seizure activity","radio",{options:["Present","Absent","Suspected","Not assessed"]}),
        f("neuroNotes","Additional neurological findings","textarea")
      ]},
      {title:"Clinical impression & differential diagnosis",fields:[
        f("etiology","Main suspected etiological category","radio",{options:["Metabolic / Endocrine","Neurological / Structural","Infectious","Toxicological / Drug-related","Cardiovascular / Circulatory","Respiratory / Hypoxic","Other","Undifferentiated / Unknown"]}),
        f("suspectedCauses","Suspected causes","check",{options:["Hypoglycemia","Hyperglycemia / DKA / HHS","Electrolyte disturbance","Hepatic encephalopathy","Uremic encephalopathy","Ischemic stroke","Intracranial hemorrhage","Postictal state","Status epilepticus","Meningitis / Encephalitis","Sepsis","Drug intoxication","Alcohol-related condition","Opioid toxicity","Hypoxia / Hypercapnia","Shock","Cardiac arrhythmia","Head injury","Other","Undetermined"]}),
        f("workingDiagnosis","Working clinical diagnosis","text"),
        f("differentials","Differential diagnoses","textarea")
      ]},
      {title:"Investigations",fields:[
        f("investigationsOrdered","Investigations ordered","check",{options:["CBC","Blood glucose","Electrolytes","Urea / Creatinine","Liver function tests","Calcium","Magnesium","ABG / VBG","ECG","CT Brain","Urinalysis","Toxicology screen","Blood cultures","Other","None","N/A"]}),
        f("investigationsDone","Investigations completed","check",{options:["CBC","Blood glucose","Electrolytes","Urea / Creatinine","Liver function tests","Calcium","Magnesium","ABG / VBG","ECG","CT Brain","Urinalysis","Toxicology screen","Blood cultures","Other","None","N/A"]}),
        f("results","Important investigation results","textarea",{hint:"Record relevant values, units and abnormal findings."}),
        f("pending","Pending investigations","check",{options:["CBC","Blood glucose","Electrolytes","Urea / Creatinine","LFT","ABG / VBG","ECG","CT Brain","Urinalysis","Toxicology","Cultures","Other","None","N/A"]})
      ]},
      {title:"Initial management",fields:[
        f("management","Management / interventions performed","check",{options:["Airway support","Oxygen therapy","IV access","IV fluids","Hypoglycemia treatment","Seizure management","Antibiotics","Antidote / specific reversal agent","Blood pressure management","Other","None","N/A"]}),
        f("medicationsGiven","Medications given","textarea",{hint:"Document medication, dose, route and administration time."}),
        f("otherInterventions","Other interventions","textarea"),
        f("response","Immediate response to treatment","radio",{options:["Significant improvement","Partial improvement","No significant change","Deterioration","Not yet assessed","N/A"]}),
        f("initialPlan","Initial management plan","textarea")
      ]}
    ]
  },
  followup: {
    title:"Follow-up / reassessment",
    subtitle:"Serial clinical assessment · Use the original Case ID",
    sections:[
      {title:"Case linking",fields:[
        f("caseId","Unique Case ID","text",{required:true,placeholder:"Enter the original Case ID"}),
        f("assessmentDate","Reassessment date","date",{required:true}),
        f("assessmentTime","Reassessment time","time",{required:true}),
        f("sinceInitial","Time since initial assessment","radio",{options:["Less than 30 minutes","30–60 minutes","1–2 hours","2–6 hours","More than 6 hours","Unknown"]})
      ]},
      {title:"Serial clinical assessment",fields:[
        f("avpu","AVPU","radio",{options:["A – Alert","V – Responds to Voice","P – Responds to Pain","U – Unresponsive","Not assessed"]}),
        f("gcsE","GCS – Eye response","radio",{options:["E4 – Spontaneous","E3 – To sound","E2 – To pressure","E1 – No response","NT – Not testable","Not assessed"]}),
        f("gcsV","GCS – Verbal response","radio",{options:["V5 – Oriented","V4 – Confused","V3 – Inappropriate words","V2 – Incomprehensible sounds","V1 – No response","NT – Not testable","Not assessed"]}),
        f("gcsM","GCS – Motor response","radio",{options:["M6 – Obeys commands","M5 – Localizes pressure","M4 – Withdraws from pressure","M3 – Abnormal flexion","M2 – Extension","M1 – No response","NT – Not testable","Not assessed"]}),
        f("gcsTotal","Total GCS (only if all components testable)","number",{min:3,max:15}),
        f("bp","Blood pressure (mmHg)","text",{placeholder:"e.g. 120/80"}),
        f("hr","Heart rate (beats/min)","number"),
        f("rr","Respiratory rate (breaths/min)","number"),
        f("spo2","SpO₂ (%)","number",{min:0,max:100}),
        f("temperature","Temperature (°C)","number"),
        f("rbs","Blood glucose","number"),
        f("neuroChanges","Changes in neurological examination","textarea"),
        f("progression","Overall clinical progression","radio",{options:["Improving","Unchanged","Deteriorating","Fluctuating","Not assessed"]}),
        f("response","Response to previous management","radio",{options:["Good response","Partial response","No response","Deterioration","Not yet assessed","N/A"]}),
        f("newEvents","New findings / events","check",{options:["Seizure activity","New focal deficit","New fever","Respiratory deterioration","Hemodynamic instability","Improved consciousness","Other","None","Not assessed"]}),
        f("newResults","New investigation results","textarea"),
        f("updatedImpression","Updated clinical impression","textarea"),
        f("furtherPlan","Further management plan","textarea")
      ]}
    ]
  },
  outcome: {
    title:"Final outcome / disposition",
    subtitle:"Close the clinical record · Use the original Case ID",
    sections:[
      {title:"Case identification",fields:[
        f("caseId","Unique Case ID","text",{required:true,placeholder:"Enter the original Case ID"}),
        f("assessmentDate","Final assessment date","date",{required:true}),
        f("assessmentTime","Final assessment time","time")
      ]},
      {title:"Final outcome",fields:[
        f("finalDiagnosis","Final clinical diagnosis","text"),
        f("certainty","Diagnostic certainty","radio",{options:["Confirmed diagnosis","Probable diagnosis","Suspected diagnosis","Undetermined"]}),
        f("finalStatus","Final clinical status","radio",{options:["Recovered / Significant improvement","Improved but requires admission","Persistent altered consciousness","Deteriorated","Other","Unknown"]}),
        f("disposition","Final disposition","radio",{options:["Discharged home","Admitted to medical ward","Admitted to ICU","Referred / Transferred","Left against medical advice","Died","Other","Unknown","N/A"]}),
        f("handover","Important handover information","textarea",{hint:"Include pending investigations, outstanding management and information communicated to the receiving team."}),
        f("learning","Most important clinical learning point","textarea"),
        f("additionalNotes","Additional notes","textarea")
      ]}
    ]
  }
};

function f(name,label,type,opts={}){return {name,label,type,...opts}}
let currentType="initial", currentStep=0, currentSections=[], formData={};
const $=s=>document.querySelector(s);

function showView(id){document.querySelectorAll(".view").forEach(v=>v.classList.remove("active"));$("#"+id).classList.add("active");window.scrollTo({top:0,behavior:"smooth"})}
function startForm(type){
  currentType=type;currentStep=0;formData={};currentSections=formConfigs[type].sections;
  $("#formTitle").textContent=formConfigs[type].title;$("#formSubtitle").textContent=formConfigs[type].subtitle;
  renderSections();showView("formView");updateStep();
}
function renderSections(){
  const host=$("#formSections");host.innerHTML="";
  currentSections.forEach((section,index)=>{
    const sec=document.createElement("section");sec.className="form-section";sec.dataset.step=index;
    sec.innerHTML=`<h2>${section.title}</h2>${section.desc?`<p class="section-desc">${section.desc}</p>`:""}`;
    section.fields.forEach(field=>sec.appendChild(renderField(field)));
    host.appendChild(sec);
  });
}
function renderField(field){
  const wrap=document.createElement("div");wrap.className="field";
  const label=document.createElement("label");label.innerHTML=esc(field.label)+(field.required?' <span class="required">*</span>':"");wrap.appendChild(label);
  if(field.hint){const hint=document.createElement("p");hint.className="hint";hint.textContent=field.hint;wrap.appendChild(hint)}
  let control;
  if(field.type==="radio"||field.type==="check"){
    control=document.createElement("div");control.className="options";
    field.options.forEach(option=>{
      const item=document.createElement("label");item.className="option";
      const input=document.createElement("input");input.type=field.type==="radio"?"radio":"checkbox";input.name=field.name;input.value=option;
      item.append(input,document.createTextNode(option));control.appendChild(item);
    });
  }else{
    control=document.createElement(field.type==="textarea"?"textarea":"input");
    if(field.type!=="textarea")control.type=field.type;
    if(field.placeholder)control.placeholder=field.placeholder;
    if(field.min!==undefined)control.min=field.min;
    if(field.max!==undefined)control.max=field.max;
    if(field.required)control.required=true;
    control.name=field.name;
  }
  wrap.appendChild(control);return wrap;
}
function esc(s){return String(s).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]))}
function updateStep(){
  document.querySelectorAll(".form-section").forEach((s,i)=>s.classList.toggle("active",i===currentStep));
  const pct=Math.round(((currentStep+1)/currentSections.length)*100);
  $("#progressBar").style.width=pct+"%";$("#stepLabel").textContent=`Section ${currentStep+1} of ${currentSections.length}`;$("#progressPercent").textContent=pct+"%";
  $("#prevBtn").classList.toggle("hidden",currentStep===0);
  $("#nextBtn").classList.toggle("hidden",currentStep===currentSections.length-1);
  $("#submitBtn").classList.toggle("hidden",currentStep!==currentSections.length-1);
  window.scrollTo({top:0,behavior:"smooth"});
}
function collectSection(){
  const section=currentSections[currentStep];
  section.fields.forEach(field=>{
    const nodes=[...document.querySelectorAll(`[name="${CSS.escape(field.name)}"]`)];
    if(field.type==="check")formData[field.name]=nodes.filter(n=>n.checked).map(n=>n.value);
    else if(field.type==="radio"){const chosen=nodes.find(n=>n.checked);formData[field.name]=chosen?chosen.value:"";}
    else formData[field.name]=nodes[0]?.value||"";
  });
}
function validateSection(){
  const sec=document.querySelector(`.form-section[data-step="${currentStep}"]`);
  const required=sec.querySelectorAll("[required]");
  for(const el of required){if(!el.value.trim()){el.focus();el.reportValidity();return false}}
  return true;
}
$("#nextBtn").addEventListener("click",()=>{if(!validateSection())return;collectSection();if(currentStep<currentSections.length-1){currentStep++;updateStep()}});
$("#prevBtn").addEventListener("click",()=>{if(currentStep>0){currentStep--;updateStep()}});
$("#caseForm").addEventListener("submit",async e=>{
  e.preventDefault();if(!validateSection())return;collectSection();
  if(!GAS_WEB_APP_URL.startsWith("https://script.google.com/")){alert("The Google Sheets connection has not been configured yet. Please add your Apps Script Web App URL in app.js.");return}
  const payload={recordType:currentType,submittedAt:new Date().toISOString(),data:formData};
  const btn=$("#submitBtn");btn.disabled=true;btn.textContent="Submitting…";
  try{
    await fetch(GAS_WEB_APP_URL,{method:"POST",mode:"no-cors",headers:{"Content-Type":"text/plain;charset=utf-8"},body:JSON.stringify(payload)});
    $("#successMessage").textContent="The submission request was sent. Because Google Apps Script does not expose a readable response to this static site, please verify that the record appears in the connected Google Sheet.";
    showView("successView");
  }catch(err){alert("Submission could not be sent. Check your internet connection and Apps Script deployment URL, then try again.");}
  finally{btn.disabled=false;btn.textContent="Submit record"}
});
document.addEventListener("click",e=>{
  const action=e.target.closest("[data-action]")?.dataset.action;if(!action)return;
  if(action==="home")showView("homeView");
  if(action==="new-case")startForm("initial");
  if(action==="follow-up")startForm("followup");
  if(action==="outcome")startForm("outcome");
});
document.querySelectorAll("[data-view]").forEach(el=>el.addEventListener("click",e=>{e.preventDefault();showView("homeView")}));
