// membuat element card

const cardTemplate = (id,title, content, username,date)=>{
    return`

    <div id="noteEditModal${id}" class="modal fade" tabindex="-1" role="dialog" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered" role="document">
            <div class="modal-content">
                <div class="modal-body">
                    <h3 class="text-dark medium">Edit Note</h3>
                    <form action="#" onsubmit="editNote(${id})">

                        <div class="form-group">
                            <label for="edit-username-">username</label>
                            <input id="edit-username-${id}" class="form-control" type="text" required value="${username}">
                        </div>

                        <div class="form-group">
                            <label for="edit-title-">Judul</label>
                            <input id="edit-title-${id}" class="form-control" type="text" required value="${title}">
                        </div>


                        <div class="form-group">
                            <label for="edit-noteArea-">note</label>
                            <textarea id="edit-noteArea-${id}" class="form-control" name="" rows="3" required>${content}</textarea>
                        </div>

                        <button class="btn btn-warning w-100" type="submit">Edit note</button>

                    </form>
                </div>
            </div>
        </div>
    </div>

    <div class="card">

        <span class="material-icons text-info small deleteIcon" data-toggle="modal" data-target="#noteEditModal${id}"
        style="margin-right : 20px;"> edit </span>

        <span class="material-icons text-secondary small deleteIcon" onclick="deleteNote(${id})"> delete </span>

            <div class="card-body">
                <h5 class="card-title">${title}</h5>
                <p class="card-text">${content}</p>
            </div>
            <div class="card-footer">
            <small>${username}</small><br/>
            <small>${date}</small>
            </div>
        </div>
    `

}


// const mainContainer = document.getElementById('mainContainer')
// mainContainer.innerHTML = cardTemplate('Ini Judul saya', 'ini content', 'username', 'date')

const getData=()=>{
    // mengambil data dari json server
    fetch('http://localhost:3000/note',{
        mode : 'cors',
        method : 'GET',
        headers : {
            "Content-Type" : "application/json"
        }
    })
    .then(res=> res.json())
    .then(data => {
        // menampilkan data di console browser
        console.log(data)
        const mainCon = document.getElementById('mainContainer')
        // mapping data yang didapatkan
        data.map((e)=>{
            // inner hasil data ke element container
            mainCon.innerHTML += cardTemplate(e.id, e.title, e.content, e.username, e.date)
        })
    })
    .catch(err=>console.log(err))
}
// membuat function berjalan    
getData()

const inputData = ()=>{
    // collect data dari form
    const us = document.getElementById('username').value
    const ttl = document.getElementById('title').value
    const nt = document.getElementById('noteArea').value
    // const dt = getwaktu()

    fetch('http://localhost:3000/note',{
        mode : 'cors',
        method : 'POST',
        headers : {
            "Content-Type" : "application/json"
        },
        body : JSON.stringify({
            username : us,
            title : ttl,
            content : nt,
            date : '29 mei 1992',
        })
})                                                                                                                  
    .then(res => res.json())
    .then(data => {
        if(data.length != 0){
            alert('note berhasil di tambahkan..')
        }else{
            alert('note gagal di tambahkan..')
        }
    })
    .catch(err => console.log(err))
}

const deleteNote = (id)=>{

    fetch(`http://localhost:3000/note/${id}`,{
        mode : 'cors',
        method : 'DELETE',
        headers : {
            "Content-Type" : "application/json"
        }
    })
    .then(res => res.json())
    .then(data => {
        if(data.length != 0){
           return alert('note berhasil di delete')        
        }else{
            alert('note gagal di delete')
        }
    })
    .catch(err => console.log(err))
}

const editNote = (id)=>{
    // kita dapatkan value dari modal edit form
    const us = document.getElementById(`edit-username-${id}`).value
    const ttl = document.getElementById(`edit-title-${id}`).value
    const nt = document.getElementById(`edit-noteArea-${id}`).value

    fetch(`http://localhost:3000/note/${id}`,{
        mode : 'cors',
        method : 'PUT',
        headers : {
            "Content-Type" : "Application/json"
        },
        body : JSON.stringify({
            username : us,
            title : ttl,
            content : nt,
            date : '29 mei 1992'
        })
    })
    .then(res => {
        console.log(res.status)
        res.json()
        alert('data berhasil di ubah..')
    })
    .catch(err => console.log(err))
}