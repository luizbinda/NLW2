import React, { useState, useEffect } from "react";

import "./styles.css";
import PageHeader from "../../components/PageHeader";

import TeacherItem, { Teacher } from "../../components/TeacherItem";
import Input from "../../components/Input";
import Select from "../../components/Select";
import api from "../../services/api";

const TeacherList: React.FC = () => {
  const [subject, setSubject] = useState("");
  const [week_day, setWeekDay] = useState("");
  const [time, setTime] = useState("");

  const [teachers, setTeachers] = useState([]);

  useEffect(() => {
    async function getClasses(subject: string, week_day: string, time: string) {
      const response = await api.get("classes", {
        params: {
          subject,
          week_day,
          time,
        },
      });
      setTeachers(response.data);
    }
    if (subject !== "" && week_day !== "" && time !== "") {
      getClasses(subject, week_day, time);
    }
  }, [subject, time, week_day]);
  return (
    <div id="page-teacher-list" className="container">
      <PageHeader title="Estes são os proffys disponívels.">
        <form id="search-teachers">
          <Select
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
            name="subjet"
            label="Matéria"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
          />
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
            value={week_day}
            onChange={(e) => setWeekDay(e.target.value)}
          />
          <Input
            type="time"
            name="time"
            label="Hora"
            value={time}
            onChange={(e) => setTime(e.target.value)}
          />
        </form>
      </PageHeader>
      <main>
        {teachers.map((teacher: Teacher) => {
          return <TeacherItem key={teacher.id} teacher={teacher} />;
        })}
      </main>
    </div>
  );
};

export default TeacherList;
