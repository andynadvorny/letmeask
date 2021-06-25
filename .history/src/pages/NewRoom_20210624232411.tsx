import { FormEvent, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

import illustrationImg from '../assets/images/illustration.svg'
import logoImg from '../assets/images/logo.svg';

import { database } from '../services/firebase'

import '../styles/auth.scss'

import { Button } from '../components/Button';

export function NewRoom() {
  const { user } = useAuth();
  const [newRoom, setNewRoom] = useState('');

  async function handleCreateRoom(event: FormEvent) {
    event.preventDefault();

    if (newRoom.trim() === '') {
      return;
    }

    const roomRef = database.ref('rooms');

    const firebaseRoom = await roomRef.push({
      title: newRoom,
      authorId: user?.id,
    })
  }

  return (
    <div id="page-auth">
      <aside>
        <img src={illustrationImg} alt="Ilustração simbolizando perguntas e respostas" />
        <strong>Crie salas de Q&amp;A ao-vivo.</strong>
        <p>Tire as dúvidas da sua audiência em tempo-real</p>
      </aside>

      <main>
        <div className="main-content">
          <img src={logoImg} alt="LetMeAsk" />
          <h2>Crie uma nova sala</h2>
          <form onSubmit={handleCreateRoom}>
            <input 
              type="text"
              placeholder="Nome da sala" 
              onChange={event => setNewRoom(event.target.value)}
              value={newRoom}
            />
            <Button type="submit">
              Criar sala
            </Button>
          </form>
          <p>
            Quer entrar em uma sala que já existe? <Link to="/">clique aqui</Link>
          </p>
        </div>
      </main>
    </div>
  )
}