
// array
let participantes = [
    {
        nome: "Diego Fernandes",
        email: "diego@gmail.com",
        dataInscricao: new Date(2024, 2, 01, 19, 23),
        dataCheckIn: new Date(2024, 2, 01, 20, 20)
    },
    {
        nome: "Mayk Brito",
        email: "mayk@gmail.com",
        dataInscricao: new Date(2024, 1, 02, 19, 23),
        dataCheckIn: null
    },
    {
        nome: "Ana Paula",
        email: "ana@gmail.com",
        dataInscricao: new Date(2024, 0, 15, 14, 30),
        dataCheckIn: new Date(2024, 0, 20, 18, 45)
    },
    {
        nome: "Pedro Santos",
        email: "pedro@gmail.com",
        dataInscricao: new Date(2024, 3, 03, 10, 15),
        dataCheckIn: new Date(2024, 3, 05, 12, 40)
    },
    {
        nome: "Carla Silva",
        email: "carla@gmail.com",
        dataInscricao: new Date(2024, 2, 28, 16, 50),
        dataCheckIn: null
    },
    {
        nome: "João Oliveira",
        email: "joao@gmail.com",
        dataInscricao: new Date(2024, 1, 10, 08, 10),
        dataCheckIn: new Date(2024, 1, 15, 14, 20)
    },
    {
        nome: "Mariana Souza",
        email: "mariana@gmail.com",
        dataInscricao: new Date(2024, 0, 05, 11, 40),
        dataCheckIn: null
    },
    {
        nome: "Lucas Almeida",
        email: "lucas@gmail.com",
        dataInscricao: new Date(2024, 2, 12, 17, 55),
        dataCheckIn: null
    },
    {
        nome: "Fernanda Costa",
        email: "fernanda@gmail.com",
        dataInscricao: new Date(2024, 3, 20, 13, 20),
        dataCheckIn: new Date(2024, 3, 22, 08, 45)
    },
    {
        nome: "Rafael Sousa",
        email: "rafael@gmail.com",
        dataInscricao: new Date(2024, 0, 30, 21, 05),
        dataCheckIn: new Date(2024, 1, 02, 09, 15)
    }
];


const criarNovoParticipante = (participante) => {
  const dataInscricao = dayjs(Date.now())
  .to(participante.dataInscricao)

  let dataCheckIn = dayjs(Date.now())
  .to(participante.dataCheckIn)
  
  // condicional
  if(participante.dataCheckIn == null) {
       dataCheckIn = `
        <button
          data-email="${participante.email}"
          onclick="fazerCheckIn(event)"
        
        >
          Confirmar check-in
       </button>

       `
      }
  
  return `
  <tr>
      <td>
        <strong>
          ${participante.nome}
        </strong>
        <br>
        <small>
          ${participante.email}
        </small>
      </td>
      <td>${dataInscricao}</td>
      <td>${dataCheckIn}</td>
    </tr>
    `

}


const atualizarLista = (participantes) => {
let output = ""
// estrutura de repetição - loop
for(let participante of participantes) {
  output = output + criarNovoParticipante(participante)

}
// substituir informação do HTML

document
.querySelector('tbody')
.innerHTML = output

}
atualizarLista(participantes)

const adicionarParticipante = (event) => {
event.preventDefault()

const dadosDoFormulario = new FormData(event.target)


const participante = {
 nome: dadosDoFormulario.get('nome'),
 email: dadosDoFormulario.get('email'),
 dataInscricao: new Date(),
 dataCheckIn: null

}

// verificar se o participante já existe
const participanteExiste = participantes.find((p) => p.email == participante.email


)

if (participanteExiste) {
alert('Email já cadastrado!')
 return
}


participantes = [participante,...participantes]
atualizarLista(participantes)

//limpar o formulario
event.target.querySelector('[name="nome"]').value = ""
event.target.querySelector('[name="email"]').value = ""


}

const fazerCheckIn = (event) => {
//confirmar se quer fazer check-in
 const mensagemConfirmacao = 'Tem certeza que deseja fazer o check-in?'
 
 if(confirm(mensagemConfirmacao) == false) {
   return
 }


// encontrar o participante dentro da lista
const participante = participantes.find((p) => p.email == event.target.dataset.email 

)
// atualizar o check-in do participante
participante.dataCheckIn = new Date()
// atualizar a lista dos participantes
atualizarLista(participantes)

}