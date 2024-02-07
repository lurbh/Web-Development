const BASE_JSON_BIN_URL = "https://api.jsonbin.io/v3/b";
const BIN_ID = "65c092bddc74654018a07144";
const MASTER_KEY = "$2a$10$XaJJUyV/TynqhPQ33L/9XePy7.sjRxdhrX4DitNWpCW0Lj7OVY9JG"

/**
 * ENUM for ERROR_CODE
 */
const ERROR_CODE = {
    0:"OK",
    1:"Missing Clinic",
    2:"Missing Doctor",
    3:"Missing Appointment Type",
    4:"Missing Date",
    5:"Missing Time",
    6:"Invalid Appointment Type"
}

/**
 * ENUM for APPT_TYPE
 */
const APPT_TYPE = [
    "General Check-up",
    "Urgent Care Appointment",
    "Follow-up Appointment",
    "Chronic Disease Management",
    "Medication Review Appointment",
    "Preventive Care Appointment"
]

/**
 * Function to create new appointment and Add it into the Appointment List
 * @param {[*]} apptList - Array of Appointment listing
 * @param {String} clinic - Name of Clinic
 * @param {String} doctor - Name of Doctor
 * @param {String} appttype - Type of Appointment
 * @param {String} date - Date of Appointment
 * @param {String} time - Time of Appointment
 */
function createAppointment(apptList, clinic, doctor, appttype, date, time) 
{
    const newAppointment = {
        // the purpose of the id is to give each Appointment an unique identity
        // use a random number for simplicty's sake
        "id": Math.floor(Math.random() * 10000),
        "clinic": clinic,
        "doctor": doctor,
        "appttype": appttype,
        "date": date,
        "time": time
    }
    // add the new Appointment to the array
    apptList.push(newAppointment);
}

/**
 * Funtion to find a specific appointment 
 * @param {Number} apptid - id of appointment to find
 * @param {[*]} apptList - Array of Appointment listing
 * @returns null or appointment object found 
 */
function getAppointment(apptid,apptList)
{
    for (let a of apptList) 
        if (a.id == apptid) 
        {
            return a;
        }
    return null;
}

/**
 * unction of find and update a specific appointment 
 * @param {[*]} apptList - Array of Appointment listing
 * @param {*} appt - Appointment details to use to update
 */
function updateAppointment(apptList, appt) 
{
    let wantedAppointment = null;
    for (let a of apptList) 
        if (a.id == appt.id) 
        {
            wantedAppointment = a;
            break;
        }
    wantedAppointment.clinic = appt.clinic;
    wantedAppointment.doctor = appt.doctor;
    wantedAppointment.appttype = appt.appttype;
    wantedAppointment.date = appt.date;
    wantedAppointment.time = appt.time;
}

/**
 * Function to cancel an appointment 
 * @param {[*]} apptList - Array of Appointment listing
 * @param {Number} id - id of appointment to find
 */
function cancelAppointment(apptList, id) {
    // we need to find the index of the Appointment that we want in delete in the apptList array
    let wantedIndex = null;
    for (let i = 0; i < apptList.length; i++) {
        // check if the id of the Appointment that I want to delete
        // matches the id of the Appointment currently indicated by index `i`.
        if (id == apptList[i].id) {
            wantedIndex = i;
        }
    }
    if (wantedIndex != null) {
        // use .splice to delete an element from array
        apptList.splice(wantedIndex, 1);
    }
}

/**
 * Function to load appointments from JSONBin
 * @returns Data from JSONBin
 */
async function loadAppointments()
{
    const response = await axios.get(BASE_JSON_BIN_URL + "/" + BIN_ID + "/latest");
    //console.log(response.data.record);
    return response.data.record;
}

/**
 * Function to save appointment listing to JSONBin
 * @param {[*]} apptList - Array of Appointment listing
 * @returns response from saving
 */
async function saveAppointments(apptList) {
    const response = await axios.put(`${BASE_JSON_BIN_URL}/${BIN_ID}`, apptList, {
      headers: {
        "Content-Type": "application/json",
        "X-Master-Key": MASTER_KEY
      }
    });
    return response.data;
  
  }