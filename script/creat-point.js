
function populateUfs(){
    const ufSelect = document
    .querySelector("select[name=uf]")

    fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
    .then((res)=>{
        return res.json()
        console.log(res)
    })
    .then(states =>{
        for(const state of states){
            ufSelect.innerHTML+=`<option value="${state.id}">${state.nome}</option>`
        }
        
        
    })
}
populateUfs()

function getCity(event){
    const citySelect=document.querySelector("select[name=city]")
    const stateInput=document.querySelector("input[name=state]")

    const ufValue= event.target.value /* pegar o value do id no option do uf  selecionado */

    const indexOfSelectedStade = event.target.selectedIndex

    stateInput.value = event.target.options[indexOfSelectedStade].text

    const url=`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios` /* criar uma constante com o Uf selecionado para facilitar a busca */
   
    fetch(url)
    .then(resp =>resp.json())
    .then(cities =>{
        
        for(const city of cities){
            citySelect.innerHTML += `<option value="${city.id}">${city.nome}</option>`
            
        }
        citySelect.disabled = false

    })
}

document
.querySelector("select[name=uf]")
.addEventListener("change",getCity)