import { useHistory, useParams } from 'react-router-dom';
import { useRoom } from '../hooks/useRoom';

import { database } from '../services/firebase';

import logoImg from '../assets/images/logo.svg';
import checkImg from '../assets/images/check.svg';
import answerImg from '../assets/images/answer.svg';
import deleteImg from '../assets/images/delete.svg';

import { Button } from '../components/Button';
import { RoomCode } from '../components/RoomCode';
import { Question } from '../components/Question';

import '../styles/room.scss'

type RoomParams = {
  id: string;
}

export function AdminRoom() {
  const history = useHistory();
  const params = useParams<RoomParams>();
  const roomId = params.id;
  const { questions, title } = useRoom(roomId);

  async function handleEndRoom() {
    await database.ref(`rooms/${roomId}`).update({
      endedAt: new Date(),
    })

    history.push('/')
  }

  async function handleAnswerQuestion(questionId: string) {
    await database.ref(`rooms/${roomId}/questions/${questionId}`).update({
      isAnswered: true,
    })
  }

  async function handleHighlightQuestion(questionId: string) {
    await database.ref(`rooms/${roomId}/questions/${questionId}`).update({
      isHighlighted: true,
    })
  }

  async function handleDeleteQuestion(questionId: string) {
    if (window.confirm('Tem certeza que você deseja excluir essa pergunta?')) {
      await database.ref(`rooms/${roomId}/questions/${questionId}`).remove()
    }
  }

  return (
    <div id="page-room">
      <header>
        <div className="content">
          <img src={logoImg} alt="Letmeask" />
          <div>
            <RoomCode code={roomId} />
            <Button 
              isOutlined
              onClick={handleEndRoom}
            >
              Encerrar sala
            </Button>
          </div>
        </div>
      </header>
      <main>
        <div className="room-title">
          <h1>Sala {title}</h1>
          { questions.length > 0 && <span>{questions.length} pergunta(s)</span> }
        </div>

        <div className="question-list">
          {questions.map(question => {
            return (
              <Question 
                key={question.id}
                content={question.content}
                author={question.author}
                isAnswered={question.isAnswered}
                isHighlighted={question.isHighlighted}
              >
                {!question.isAnswered && (
                  <>
                    <button
                      type="button"
                      onClick={() => handleAnswerQuestion(question.id)}
                    >
                      <img src={checkImg} alt="mark as answered" />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleHighlightQuestion(question.id)}
                    >
                      <img src={answerImg} alt="highlight question" />
                    </button>
                  </>
                )}
                <button
                  type="button"
                  onClick={() => handleDeleteQuestion(question.id)}
                >
                  <img src={deleteImg} alt="delete question" />
                </button>
              </Question>
            );
          })}
        </div>
      </main>
    </div>
  )
}