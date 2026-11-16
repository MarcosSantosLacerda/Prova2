import { Link } from "react-router-dom";
import { useState } from "react";
import {
    listarPorSituacao,
    obterSuspenso,
    registrarVoto
} from "../services/votacaoService";
import JogadorCard from "../components/JogadorCard";
function Votacao() {
    const [selecionado, setSelecionado] = useState(null);
    const [historico, setHistorico] = useState([]);
    const indicados = listarPorSituacao("indicado");
    const elenco = listarPorSituacao("elenco");
    const suspenso = obterSuspenso();
    function handleConfirmar() {
        if (selecionado) {
            registrarVoto(selecionado.id);
            setHistorico([...historico, selecionado.nome]);
            setSelecionado(null);
        }
    }
    return (
        <div>
            <h1>Votação Craque do Jogo</h1>
            <h2>Jogadores indicados</h2>
            <div className="grade-indicados">
                {indicados.map((j) => (
                    <JogadorCard
                        key={j.id}
                        jogador={j}
                        selecionado={selecionado?.id === j.id}
                        onSelecionar={setSelecionado}
                    />
                ))}
            </div>
            <div className="confirmacao">
                <p>
                    {selecionado
                        ? `Seu voto vai para ${selecionado.nome}.`
                        : "Nenhum jogador selecionado."}
                </p>
                <button
                    onClick={handleConfirmar}
                    disabled={!selecionado}
                >
                    Confirmar voto
                </button>
            </div>
            {historico.length > 0 && (
                <section>
                    <h2>Histórico de votos</h2>
                    <p>
                        {historico.length} {historico.length === 1 ? "voto" : "votos"}
                    </p>
                    <ol>
                        {historico.map((nome, index) => (
                            <li key={index}>{nome}</li>
                        ))}
                    </ol>
                    <Link to="/resultado">
                        Ver resultado
                    </Link>
                </section>
            )}
            <section>
                <h2>Jogador suspenso</h2>
                <JogadorCard jogador={suspenso} />
            </section>
            <section>
                <h2>Demais jogadores</h2>
                <div className="grade-elenco">
                    {elenco.map((j) => (
                        <JogadorCard
                            key={j.id}
                            jogador={j}
                        />
                    ))}
                </div>
            </section>
        </div>
    );
}
export default Votacao;
