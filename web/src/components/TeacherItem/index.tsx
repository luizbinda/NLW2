import React from "react";

import "./styles.css";
import whatsIcons from "../../assets/images/icons/whatsapp.svg";

const TeacherItem: React.FC = () => {
  return (
    <article className="teacher-item">
      <header>
        <img
          src="https://avatars1.githubusercontent.com/u/49559951?s=460&v=4"
          alt="Avatar"
        />
        <div>
          <strong>Nome Avatar</strong>
          <span>Quimica</span>
        </div>
      </header>
      <p>
        adsbkhabsgd bhab
        <br />
        <br /> hdabshdb a bhalksbdhk b
      </p>

      <footer>
        <p>
          Preço/hora
          <strong>R$ 80,00</strong>
        </p>
        <button>
          <img src={whatsIcons} alt="Whatsapp" />
          Entrar em contato
        </button>
      </footer>
    </article>
  );
};

export default TeacherItem;
