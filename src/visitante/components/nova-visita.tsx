import React from 'react'
import { Box, Button, Link, Label, RichText, ButtonGroup } from "@admin-bro/design-system"
import { BasePropertyProps } from 'admin-bro'
import Select from "react-dropdown-select";
import axios from "axios";

const Edit: React.FC<BasePropertyProps> = (props) => {
  const { record } = props

  const srcImg = record.params['_id']
  
  let DataAtual = new Date()
  const options = [
    { value: 'Casa 1', label: 'Casa 1' },
    { value: 'Casa 2', label: 'Casa 2' },
    { value: 'Casa 3', label: 'Casa 3' },
    { value: 'Casa 4', label: 'Casa 4' },
    { value: 'Casa 5', label: 'Casa 5' },
  ]
   const [value, setValue] = React.useState("Insira aqui, a casa que será visitada.")
   let valorCasa = value

	
  // let valorCasa = value
  function teste() {
    //console.log(valorCasa);

    axios.post('http://localhost:8080/admin/api/resources/Visita/actions/new', {
      visitante: srcImg,
      casa: valorCasa,
      data: DataAtual
    })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
    // alert("Visita cadastrada com sucesso");
    // window.location.href = 'http://localhost:8080/admin'

  }
  // <RichText id="casa" quill={{ theme: 'snow' }} value={value} onChange={setValue} />
  // Select options={options} width={1/2} value={value} />
  return (
    <Box>
      <br></br>
      <br></br>
      <RichText id="casa" quill={{ theme: 'snow' }} value={value} onChange={setValue} />
      <br></br>
      <br></br>
      <Link>
        <Button onClick={teste}>Nova visita</Button>
      </Link>
    </Box>
  );
}

export default Edit
