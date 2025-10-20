/**
 * Arquivo: script.js
 * Lógica para a Calculadora de Médias Escolares
 */

document.addEventListener('DOMContentLoaded', () => {
    // 1. Seleciona o formulário e a área de resultados
    const formNotas = document.getElementById('formNotas');
    const resultadosDiv = document.getElementById('resultados');

    // Adiciona um listener para o evento de submissão do formulário
    formNotas.addEventListener('submit', function(event) {
        event.preventDefault(); // Impede o envio tradicional do formulário (recarregamento)

        // Limpa mensagens de erro e oculta resultados antes de novo cálculo
        resultadosDiv.style.display = 'none';

        // 2. Coletar as 8 notas
        const notas = [];
        let todasNotasValidas = true;

        for (let i = 1; i <= 8; i++) {
            const inputElement = document.getElementById(`n${i}`);
            
            // Converte o valor do input (string) para número decimal (float)
            let nota = parseFloat(inputElement.value);

            // Validação: verifica se é um número, se está entre 0.0 e 10.0
            if (isNaN(nota) || nota < 0 || nota > 10) {
                alert(`Por favor, insira uma nota válida para a ${i}ª Avaliação (entre 0.0 e 10.0).`);
                inputElement.focus(); // Foca no input inválido
                todasNotasValidas = false;
                break; // Sai do loop
            }
            notas.push(nota);
        }

        if (!todasNotasValidas) {
            return; // Interrompe a execução se houver notas inválidas
        }

        // 3. Função auxiliar para formatar o resultado com 1 casa decimal
        const formatar = (valor) => valor.toFixed(1);

        // 4. Cálculo das Médias (Lógica do sistema escolar)
        
        // Médias Bimestrais (Média de 2 notas por bimestre)
        const mediaBimestre1 = (notas[0] + notas[1]) / 2; // Notas 1 e 2
        const mediaBimestre2 = (notas[2] + notas[3]) / 2; // Notas 3 e 4
        const mediaBimestre3 = (notas[4] + notas[5]) / 2; // Notas 5 e 6
        const mediaBimestre4 = (notas[6] + notas[7]) / 2; // Notas 7 e 8

        // Médias Semestrais (Média dos Bimestres do semestre)
        const mediaSemestre1 = (mediaBimestre1 + mediaBimestre2) / 2;
        const mediaSemestre2 = (mediaBimestre3 + mediaBimestre4) / 2;

        // Média Final (Média dos Semestres)
        const mediaFinal = (mediaSemestre1 + mediaSemestre2) / 2;

        // 5. Exibir os Resultados na interface (DOM Manipulation)

        // 1º Semestre
        document.getElementById('mB1').textContent = formatar(mediaBimestre1);
        document.getElementById('mB2').textContent = formatar(mediaBimestre2);
        document.getElementById('mS1').textContent = formatar(mediaSemestre1);

        // 2º Semestre
        document.getElementById('mB3').textContent = formatar(mediaBimestre3);
        document.getElementById('mB4').textContent = formatar(mediaBimestre4);
        document.getElementById('mS2').textContent = formatar(mediaSemestre2);

        // Média Final
        document.getElementById('mF').textContent = formatar(mediaFinal);

        // 6. Mostra a div de resultados
        resultadosDiv.style.display = 'block';
    });
});
