// Main function when page is loaded
function main(filedata){
    let apptList = [];
    let datetime = new Date('March 13, 2024 14:20');
    let date = formatDate(datetime);
    let time = formatTime(datetime);
    //createAppointment(apptList, "Harmony Health Center", "Dr. Olivia Bennett", "General Check-up", date, time);
    //createAppointment(apptList, "Harmony Health Center", "Dr. Olivia Bennett", "General Check-up", date, time);

    // Load data onto page from filedata
    loadDataFromFile(apptList,filedata);
    sortById(apptList);
    renderApptlist(apptList);

    // Add Event Listener for buttons
    const addAppointmentButton = document.querySelector("#addAppointmentbtn");
    addAppointmentButton.addEventListener("click", function(){
        toggleAddAppointment();
    });

    const cancelButton = document.querySelector("#canceltbtn");
    cancelButton.addEventListener("click", function(){
        hideAddAppointment();
    });

    const submitAppointmentButton = document.querySelector("#submitAppointmentbtn");
    submitAppointmentButton.addEventListener("click", function(){
        submitAddAppointment(apptList);
        renderApptlist(apptList);
    });

    const editAppointmentButton = document.querySelector("#editAppointmentbtn");
    editAppointmentButton.addEventListener("click", function(){
        submiteditAppointment(apptList);
        renderApptlist(apptList);
    });

    const saveAppointmentsButton = document.querySelector("#saveAppointmentsbtn");
    saveAppointmentsButton.addEventListener("click", function(){
        saveAppointments(apptList);
        alert("Appointments has been saved.");
    });
    
    const sortByIdtable = document.querySelector("#sortbyid");
    sortByIdtable.addEventListener("click", function(){
        sortById(apptList);
    });

    const sortByClinictable = document.querySelector("#sortbyclinic");
    sortByClinictable.addEventListener("click", function(){
        sortByClinic(apptList);
    });

    const sortByDoctortable = document.querySelector("#sortbydoctor");
    sortByDoctortable.addEventListener("click", function(){
        sortByDoctor(apptList);
    });

    const sortByTypetable = document.querySelector("#sortbytype");
    sortByTypetable.addEventListener("click", function(){
        sortByType(apptList);
    });

    const sortByDatetable = document.querySelector("#sortbydate");
    sortByDatetable.addEventListener("click", function(){
        sortByDate(apptList);
    });

    const sortByDateTimetable = document.querySelector("#sortbytime");
    sortByDateTimetable.addEventListener("click", function(){
        console.log("Sort By Date Time");
        sortByDateTime(apptList);
    });
}

function sortById(apptList)
{
    apptList.sort((a, b) => a.id - b.id);
    renderApptlist(apptList);
}

function sortByClinic(apptList)
{
    apptList.sort((a, b) => a.clinic.localeCompare(b.clinic));
    renderApptlist(apptList);
}

function sortByDoctor(apptList)
{
    apptList.sort((a, b) => a.doctor.localeCompare(b.doctor));
    renderApptlist(apptList);
}

function sortByType(apptList)
{
    apptList.sort((a, b) => APPT_TYPE.indexOf(a.appttype) - APPT_TYPE.indexOf(b.appttype));
    renderApptlist(apptList);
}

function sortByDate(apptList)
{
    
    apptList.sort((a , b) => {
        a = a.date.split('-').join('');
        b = b.date.split('-').join('');
        return a > b ? 1 : a < b ? -1 : 0;
    });
    renderApptlist(apptList);
}

function sortByDateTime(apptList)
{
    apptList.sort((a , b) => {
        datea = a.date.split('-').join('') + a.time.split(':').join('');
        dateb = b.date.split('-').join('') + b.time.split(':').join('');
        return datea > dateb ? 1 : datea < dateb ? -1 : 0;
    });
    renderApptlist(apptList);
}

// Function to check if form is filled up
function checkUserInput()
{
    const clinic = document.querySelector("#clinic");
    const doctor = document.querySelector("#doctor");
    const appttype = document.querySelector("#appttype");
    const date = document.querySelector("#date");
    const time = document.querySelector("#time");
    if (clinic.value == "")
        return ERROR_CODE[1];
    if (doctor.value ==  "")
        return ERROR_CODE[2];
    if (appttype.value ==  "")
        return ERROR_CODE[3];
    if (date.value == "")
        return ERROR_CODE[4];
    if (time.value ==  "")
        return ERROR_CODE[5];
    if (APPT_TYPE.indexOf(appttype.value) == -1)
        return ERROR_CODE[6];
    return ERROR_CODE[0];
}

// Function to format date from a Date into a string
function formatDate(date) {
    var month = '' + (date.getMonth()),
        day = '' + date.getDate(),
        year = date.getFullYear();

    if (month.length < 2) 
        month = '0' + month;
    if (day.length < 2) 
        day = '0' + day;

    return [year, month, day].join('-');
}

// Function to format time from a Date into a string
function formatTime(time) {
    let hr = '' + (time.getHours()),
        min = '' + time.getMinutes();

    if (hr.length < 2) 
        hr = '0' + hr;
    if (min.length < 2) 
        min = '0' + min;

    return [hr, min].join(':');
}

// Function to show the add appointment form to fill in
function toggleAddAppointment()
{
    const addApptbtn = document.querySelector("#addAppointmentbtn");
    const addAppt = document.querySelector("#addAppointment");
    const editApptbtn = document.querySelector("#editAppointmentbtn");
    const subApptbtn = document.querySelector("#submitAppointmentbtn");
    // Toggles View and set button usability
    editApptbtn.style.display = "None";
    subApptbtn.style.display = "block";
    addAppt.style.display = "block";
    addApptbtn.disabled = true;
    addAppt.scrollIntoView();
}

// Function to show the add appointment form to fill in
function hideAddAppointment()
{
    const addApptbtn = document.querySelector("#addAppointmentbtn");
    const addAppt = document.querySelector("#addAppointment");
    const editApptbtn = document.querySelector("#editAppointmentbtn");
    const subApptbtn = document.querySelector("#submitAppointmentbtn");
    const top = document.querySelector("#bookappointment");
    // Toggles View and set button usability
    editApptbtn.style.display = "None";
    subApptbtn.style.display = "None";
    addAppt.style.display = "None";
    addApptbtn.disabled = false;
    top.scrollIntoView();
}

// Function to add appointment from data from form
function submitAddAppointment(apptList)
{
    let formcheck = checkUserInput();
    if (formcheck !="OK")
    {
        alert(formcheck);
        return;
    }
    const addApptbtn = document.querySelector("#addAppointmentbtn");
    const addAppt = document.querySelector("#addAppointment");
    const clinic = document.querySelector("#clinic");
    const doctor = document.querySelector("#doctor");
    const appttype = document.querySelector("#appttype");
    const date = document.querySelector("#date");
    const time = document.querySelector("#time");
    const top = document.querySelector("#bookappointment");
    // create appointment
    createAppointment(apptList,clinic.value,doctor.value,appttype.value,date.value,time.value);
    // reset form and return view to top and set button usability
    clinic.value = "";
    doctor.value = "";
    appttype.value = "";
    date.value = "";
    time.value = "";
    addAppt.style.display = "none";
    addApptbtn.disabled = false;
    top.scrollIntoView();
}

// Function to Chage color based on the appointment type
function getTypeColor(appttype) {
    if (appttype=="General Check-up") 
        return "#0d6efd";
    else if(appttype =="Urgent Care Appointment") 
        return "yellow";
    else if (appttype =="Follow-up Appointment") 
        return "lightblue"
    else if (appttype =="Chronic Disease Management") 
        return "red";
    else if (appttype =="Medication Review Appointment") 
        return "green";
    else if (appttype =="Preventive Care Appointment") 
        return "orange";
}

// Render the Appointment List in a table
function renderApptlist(apptList)
{
    const appttable = document.querySelector("#tablebody");
    appttable.innerHTML = "";
    for(let a of apptList)
    {
        const tablerow = document.createElement('tr');
        tablerow.innerHTML = `
        <th scope="row">${a.id}</th>
        <td>${a.clinic}</td>
        <td>${a.doctor}</td>
        <td style="color:${getTypeColor(a.appttype)};">${a.appttype}</td>
        <td>${a.date}</td>
        <td>${a.time}</td>
        <td><button class="btn btn-primary btn-sm edit-button">Edit</button></td>
        <td><button class="btn btn-danger btn-sm delete-button">Cancel</button></td>
        `;

        // select the edit button that is inside the apptList
        const editButton = tablerow.querySelector(".edit-button");
        editButton.addEventListener("click", function(){
            processEditAppointment(a, apptList);
        })

        // select the delete button that is inside the apptList
        tablerow.querySelector(".delete-button").addEventListener("click", function(){
            processCancelAppointment(a, apptList);
        })

        appttable.appendChild(tablerow);
    }
}

// Function to open edit an appointment form
function processEditAppointment(a,apptList)
{
    const editApptbtn = document.querySelector("#editAppointmentbtn")
    const addApptbtn = document.querySelector("#addAppointmentbtn");
    const subApptbtn = document.querySelector("#submitAppointmentbtn");
    const addAppt = document.querySelector("#addAppointment");
    const id = document.querySelector("#id");
    const clinic = document.querySelector("#clinic");
    const doctor = document.querySelector("#doctor");
    const appttype = document.querySelector("#appttype");
    const date = document.querySelector("#date");
    const time = document.querySelector("#time");
    // Get the details of appointment to edit and fill the form
    const appt = getAppointment(a.id,apptList);
    id.value = appt.id;
    clinic.value = appt.clinic;
    doctor.value = appt.doctor;
    appttype.value = appt.appttype;
    date.value = appt.date;
    time.value = appt.time;
    // Toggles View and set button usability
    editApptbtn.style.display = "block";
    subApptbtn.style.display = "None";
    addAppt.style.display = "block";
    addApptbtn.disabled = true;
    addAppt.scrollIntoView();
}

// Function to submit updated appointment info
function submiteditAppointment(apptList)
{
    let formcheck = checkUserInput();
    if (formcheck !="OK")
    {
        alert(formcheck);
        return;
    }
    const editApptbtn = document.querySelector("#editAppointmentbtn")
    const addApptbtn = document.querySelector("#addAppointmentbtn");
    const subApptbtn = document.querySelector("#submitAppointmentbtn");
    const addAppt = document.querySelector("#addAppointment");
    const id = document.querySelector("#id");
    const clinic = document.querySelector("#clinic");
    const doctor = document.querySelector("#doctor");
    const appttype = document.querySelector("#appttype");
    const date = document.querySelector("#date");
    const time = document.querySelector("#time");
    const top = document.querySelector("#bookappointment")
    // get updated info and prep to update
    const updatedAppt = {
        "id": id.value,
        "clinic": clinic.value,
        "doctor": doctor.value,
        "appttype": appttype.value,
        "date": date.value,
        "time": time.value
    }
    updateAppointment(apptList,updatedAppt);
    // reset form when update is done
    clinic.value = "";
    doctor.value = "";
    appttype.value = "";
    date.value = "";
    time.value = "";
    // Toggles View and set button usability
    editApptbtn.style.display = "None";
    subApptbtn.style.display = "block";
    addAppt.style.display = "None";
    addApptbtn.disabled = false;
    renderApptlist(apptList);
    top.scrollIntoView();
}

// Function to cancel appointment
function processCancelAppointment(appt,apptList)
{
    // prompt user to confirm appointment cancellation 
    const confirmDelete = confirm(`Are you sure you want to cancel appointment at ${appt.clinic} with ${appt.doctor} on ${appt.date}, ${appt.time}?`);
    if (confirmDelete) {
        cancelAppointment(apptList, appt.id);
    }
    renderApptlist(apptList);
}

// Function to load data from file provided 
function loadDataFromFile(apptList,filedata)
{
    for(let data of filedata)
        createAppointment(apptList, data.clinic, data.doctor, data.appttype, data.date, data.time);
}

document.addEventListener("DOMContentLoaded", async function() {
    // Get data from JSON file
    //const response = await axios.get("data.json");
    const data = await loadAppointments();
    //console.log(data);
    //console.log(response);
    // Pass data into main function
    main(data);
});