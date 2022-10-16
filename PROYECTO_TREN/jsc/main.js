const DB = [];
crearVagones();

function setUPVagon() {
    const vagon = [
        "Vagon-1",
        "Vagon-2",
        "Vagon-3",
        "Vagon-4",
        "Vagon-5",
        "Vagon-6",
        "Vagon-7",
        "Vagon-8",
        "Vagon-9",
        "Vagon-10"
    ];
    const rows = 10;
    const sillas = 11;

    return {
        vagon,
        rows,
        sillas
    };
}

function crearVagones() {
    const setUP = setUPVagon();
    document.querySelector(".rows-container").innerHTML = "";
    
    for (let i = 0; i < setUP.rows; i++) {
        document.querySelector(".rows-container"
        ).innerHTML += `<div  class=" d-flex border border-primary justify-content-around p-3 ${setUP.vagon[i]}">
        <div  class="border border-sucess p-3 seat">${setUP.vagon[i]}</div>`;

        for (let s = 1; s < setUP.sillas; s++) {

            const indexObject = DB.findIndex((object) => {return object.seatCode == setUP.vagon[i]+" Silla "+s;});
    

            document.querySelector(`.${setUP.vagon[i]}`).innerHTML += `<div class=" cambiando border border-sucess p-3 seat ${indexObject > -1 ? 'seat-busy': 'seatno-busy'}" onclick="seatInfo('${setUP.vagon[i]}', ${s})">${s}</div>`
            
        }
    
        document.querySelector('.rows-container').innerHTML += `<div class="Container">
        <table class="tab-${setUP.vagon[i]} table border border-sucess " >
        <thead>
            <th>Puesto</th>
            <th>Cédula</th>
            <th>Nombre</th>
            <th>Acción</th>
        </thead>
        <tbody></tbody>
        </table></div></div>`;
        

      }
    }

    function seatInfo(vagon, seatNumber) {
        document.querySelector(".seat-info").innerHTML = `La silla seleccionada es: ${
          vagon +" SILLA "+ seatNumber
        }`;
        document.querySelector(
          ".reserve-button"
        ).innerHTML = `<button type="button" class="btn btn-primary" onclick="reserve('${vagon}',${seatNumber})">Reservar ${
          vagon +" Silla "+ seatNumber
        }</button>`;
      }


function reserve(vagon, seatNumber) {
    const fullName = document.querySelector(".full-name").value;
    const cc = document.querySelector(".cc").value;
  
    DB.push({
      fullName,
      cc,
      vagon,
      seatNumber,
      seatCode: vagon +" Silla "+ seatNumber,
    });
  

    crearVagones();
    reserveTable();
    document.querySelector(".full-name").value = "";
    document.querySelector(".cc").value = "";
  }
  function reserveTable() {
    document.querySelector(".table tbody").innerHTML = "";
    for (let i = 0; i < DB.length; i++) {
    
      document.querySelector(` .tab-${DB[i].vagon} tbody`).innerHTML += `<tr><td>${DB[i].seatCode}</td><td>${DB[i].cc}</td><td>${DB[i].fullName}</td><td> <button type="button" class="btn" onclick="deleteReservation('${DB[i].seatCode}')"><i class="bi bi-trash-fill"></i></button></td></tr>`;
 
    }
  }
  
function deleteReservation(seatCode) {
    console.log(seatCode);
    const indexObject = DB.findIndex((object) => {
      return object.seatCode == seatCode;
    });
  
    DB.splice(indexObject, 1);
    
    crearVagones();
    reserveTable();
   
  } 
  