
function JogadorCard({ jogador, selecionado = false, onSelecionar }) {
    const SELOS = {
        indicado: "INDICADO",
        suspenso: "SUSPENSO",
        elenco: undefined
    };
    const { nome, foto, numero, posicao, situacao } = jogador;
    return (
        <div className={`card card-${situacao} ${selecionado ? "card-selecionado" : ""}`}>
            <img src={foto} alt={nome} />
            <span className={`selo selo-${situacao}`}>
                {SELOS[situacao]}
            </span>
            <h3>#{numero} - {nome}</h3>
            <p>{posicao}</p>
            {onSelecionar && (
                <button onClick={() => onSelecionar(jogador)}>
                    {selecionado ? "✓ Selecionado" : "Selecionar"}
                </button>
            )}
        </div>
    );
}
export default JogadorCard;
