import React, { useState, FormEvent } from "react";
import PageHeader from "../../components/PageHeader";

import "./styles.css";
import Input from "../../components/Input";
import Textarea from "../../components/TextArea";
import Select from "../../components/Select";

import warningIcon from "../../assets/images/icons/warning.svg";
import api from "../../services/api";
import { useHistory } from "react-router-dom";

const TeacherForm: React.FC = () => {
  const history = useHistory();

  const [name, setName] = useState("");
  const [avatar, setAvatar] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [bio, setBio] = useState("");

  const [subject, setSubject] = useState("");
  const [cost, setCost] = useState("");

  function handleAddHorario() {
    setSheduleItems([...sheduleItems, { week_day: "0", from: "", to: "" }]);
  }

  async function handleCreateClass(e: FormEvent) {
    e.preventDefault();
    await api
      .post("classes", {
        name,
        avatar,
        whatsapp,
        bio,
        subject,
        cost: Number(cost),
        schedule: sheduleItems,
      })
      .then(() => {
        alert("Cadastrado com sucesso!");
        history.push("/");
      })
      .catch((err) => {
        console.log(err);
        alert("Error no cadastro!");
      });
  }

  function setSheduleItemsvalue(index: Number, field: string, value: string) {
    const newSheduleItems = sheduleItems.map((item, idx) => {
      if (index === idx) return { ...item, [field]: value };
      return item;
    });

    setSheduleItems(newSheduleItems);
  }

  const [sheduleItems, setSheduleItems] = useState([
    { week_day: "0", from: "", to: "" },
  ]);

  return (
    <div id="page-teacher-form" className="container">
      <PageHeader
        title="Que incrível que você quer dar aulas."
        description="o primeiro passo é preencher esse formulario de inscrição"
      />
      <main>
        <form onSubmit={(e) => handleCreateClass(e)}>
          <fieldset>
            <legend>Seus dados</legend>
            <Input
              label="Nome"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <Input
              label="Avatar"
              name="avatar"
              value={avatar}
              onChange={(e) => setAvatar(e.target.value)}
            />
            <Input
              label="Whatsapp"
              name="whatsapp"
              value={whatsapp}
              onChange={(e) => setWhatsapp(e.target.value)}
            />
            <Textarea
              name="bio"
              label="Biografia"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
            />
          </fieldset>
          <fieldset>
            <legend>Sobre a aula</legend>
            <Select
              label="Matéria"
              name="subject"
              options={[
                { value: "Artes", label: "Artes" },
                { value: "Biologia", label: "Biologia" },
                { value: "Ciências", label: "Ciências" },
                { value: "Educação Fisica", label: "Educação Fisica" },
                { value: "Geografia", label: "Geografia" },
                { value: "História", label: "História" },
                { value: "Mátematica", label: "Mátematica" },
                { value: "Português", label: "Português" },
                { value: "Química", label: "Química" },
              ]}
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
            />
            <Input
              label="Custo da aula por hora"
              name="cost"
              value={cost}
              onChange={(e) => setCost(e.target.value)}
            />
          </fieldset>
          <fieldset>
            <legend>
              Horários disponíveis
              <button type="button" onClick={handleAddHorario}>
                + Novo horário{" "}
              </button>
            </legend>

            {sheduleItems.map((item, index) => (
              <div key={index} className="shedule-item">
                <Select
                  options={[
                    { value: "0", label: "domingo" },
                    { value: "1", label: "segunda-feira" },
                    { value: "2", label: "terça-feira" },
                    { value: "3", label: "quarta-feira" },
                    { value: "4", label: "quinta-feira" },
                    { value: "5", label: "sexta-feira" },
                    { value: "6", label: "sabado" },
                  ]}
                  name="week-day"
                  label="Dia da semana"
                  onChange={(e) =>
                    setSheduleItemsvalue(index, "week_day", e.target.value)
                  }
                />
                <Input
                  name="from"
                  label="Das"
                  type="time"
                  onChange={(e) =>
                    setSheduleItemsvalue(index, "from", e.target.value)
                  }
                />
                <Input
                  name="to"
                  label="Até"
                  type="time"
                  onChange={(e) =>
                    setSheduleItemsvalue(index, "to", e.target.value)
                  }
                />
              </div>
            ))}
          </fieldset>
          <footer>
            <p>
              <img src={warningIcon} alt="Aviso" />
              Importante ! <br />
              Preencha todos os dados
            </p>
            <button type="submit">Salvar Cadastro</button>
          </footer>
        </form>
      </main>
    </div>
  );
};

export default TeacherForm;
