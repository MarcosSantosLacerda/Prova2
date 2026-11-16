import { Link } from "react-router-dom";
import { useState } from "react";
import {
  obterVotos,
  calcularResultado,
  desfazerUltimoVoto,
  zerarVotos
} from "../services/votacaoService";
function Resultado() {
    const [votos, setVotos] = useState(obterVotos());
    const total = votos.length;
    const resultado = calcularResultado(votos);
    const primeiro = resultado[0];
    const segundo = resultado[1];
    function handleDesfazer() {
        const votosAtualizados = desfazerUltimoVoto();
        setVotos(votosAtualizados);
    }
    function handleZerar() {
        const confirmar = window.confirm("Deseja realmente zerar a votação?");
        if (confirmar) {
            zerarVotos();
            setVotos([]);
        }
    }
    return (
        <div className="pagina-resultado">
            <h1>Resultado da votação</h1>
            {total === 0 ? (
                <div>
                    <h2>Nenhum voto registrado ainda.</h2>
                    <p>Seja o primeiro a votar!</p>
                    <Link to="/votacao">Ir para votação</Link>
                </div>
            ) : (
                <>
                    <h2>Total de votos: {total}</h2>
                    <div className="lideranca">
                        {primeiro && segundo && (
                            primeiro.votos === segundo.votos ? (
                                <p>
                                    Empate na liderança entre {primeiro.nome} e {segundo.nome}!
                                </p>
                            ) : (
                                <p>
                                    {primeiro.nome} lidera com{" "}
                                    {primeiro.votos - segundo.votos}{" "}
                                    {primeiro.votos - segundo.votos === 1 ? "voto" : "votos"} de
                                    vantagem sobre {segundo.nome}.
                                </p>
                            )
                        )}
                    </div>
                    <div className="placar">
                        {resultado.map((j, index) => (
                            <div
                                key={j.id}
                                className={
                                    index === 0
                                        ? "placar-item placar-craque"
                                        : index === 1
                                            ? "placar-item placar-vice"
                                            : "placar-item"
                                }
                            >
                                <h3>
                                    {index + 1}º - {j.nome}
                                </h3>
                                {index === 0 && <span>Craque do jogo</span>}
                                {index === 1 && <span>Vice</span>}
                                <p>
                                    {j.votos} {j.votos === 1 ? "voto" : "votos"}
                                </p>
                                <p>
                                    {j.percentual.toLocaleString("pt-BR", {
                                        maximumFractionDigits: 1
                                    })}%
                                </p>
                                <div className="barra">
                                    <div
                                        className="barra-preenchida"
                                        style={{ width: `${j.percentual}%` }}
                                    ></div>
                                </div>
                            </div>
                        ))}
                    </div>
                </>
            )}
            <div className="botoes-resultado">
                <button onClick={handleDesfazer} disabled={total === 0}>
                    Desfazer voto
                </button>
                <button onClick={handleZerar} disabled={total === 0}>
                    Resetar votação
                </button>
            </div>
            <Link to="/votacao">Voltar para votação</Link>
        </div>
    );
}
export default Resultado;