document.addEventListener('DOMContentLoaded', () => {
    // Exibição de telefones
    const telefones = {
        1: { showing: false, text: '(11) 94002-8922', defaultText: 'Ver telefone' },
        2: { showing: false, text: '(11) 99810-5896', defaultText: 'Ver telefone' }
    };

    function mostrarTelefone(id, elemento) {
        const estado = telefones[id];
        elemento.innerHTML = estado.showing ? estado.defaultText : estado.text;
        estado.showing = !estado.showing;
    }

    document.getElementById('mostrarTelefone1').addEventListener('click', function () {
        mostrarTelefone(1, this);
    });

    document.getElementById('mostrarTelefone2').addEventListener('click', function () {
        mostrarTelefone(2, this);
    });

    // Máscaras de CPF e Telefone em tempo real
    function aplicarMascaraCPF(cpf) {
        cpf = cpf.replace(/\D/g, '');
        if (cpf.length <= 3) return cpf;
        if (cpf.length <= 6) return cpf.replace(/(\d{3})(\d+)/, '$1.$2');
        if (cpf.length <= 9) return cpf.replace(/(\d{3})(\d{3})(\d+)/, '$1.$2.$3');
        return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d+)/, '$1.$2.$3-$4');
    }

    function aplicarMascaraTelefone(telefone) {
        telefone = telefone.replace(/\D/g, '');
        if (telefone.length <= 2) return telefone;
        if (telefone.length <= 7) return telefone.replace(/(\d{2})(\d+)/, '($1) $2');
        return telefone.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
    }

    document.getElementById('cpfInput').addEventListener('input', function () {
        this.value = aplicarMascaraCPF(this.value);
    });

    document.getElementById('telefoneInput').addEventListener('input', function () {
        this.value = aplicarMascaraTelefone(this.value);
    });

    document.getElementById('botaoEnviar').addEventListener('click', function () {
        alert('Mensagem enviada!');
        document.getElementById('cpfInput').value = '';
        document.getElementById('telefoneInput').value = '';
        document.getElementById('mensagemInput').value = '';
    });

    // Cálculo da Regra de 3
    document.getElementById('botaoCalcular').addEventListener('click', function () {
        const x = parseFloat(document.getElementById('valorX').value);
        const y = parseFloat(document.getElementById('valorY').value);
        const z = parseFloat(document.getElementById('valorZ').value);

        if (isNaN(x) || isNaN(y) || isNaN(z) || x === 0) {
            document.getElementById('resultado').value = 'Não pode ser dividido por 0';
            return;
        }

        const resultado = (y * z) / x;
        document.getElementById('resultado').value = resultado.toFixed(2);
    });

    // Abrir modal
    function abrirModal() {
        document.querySelector('.overlay').style.display = 'block';
        document.getElementById('modal').style.display = 'block';
        document.getElementById('imagemModal').src = './resources/images/Image3.png';
    }

    function fecharModal() {
        document.querySelector('.overlay').style.display = 'none';
        document.getElementById('modal').style.display = 'none';
    }

    document.getElementById('abrirModal').addEventListener('click', abrirModal);
    document.getElementById('fecharModal').addEventListener('click', fecharModal);
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') fecharModal();
    });

    // Download de imagem com html2canvas
    document.getElementById('botaoDownloadBtn').addEventListener('click', async function () {
        try {
            const element = document.getElementById('areaCaptura');
            const canvas = await html2canvas(element);
            canvas.toBlob(function (blob) {
                const url = URL.createObjectURL(blob);
                const link = document.createElement('a');
                link.href = url;
                link.download = 'Imagem_Teste.png';
                link.click();
                URL.revokeObjectURL(url);
            }, 'image/png');
        } catch (err) {
            console.error('Erro ao capturar e baixar a imagem:', err);
        }
    });

    // Animação de zoom ao carregar a página
    const zoomImage = document.getElementById('zoomImage');
    const initialScale = 3;
    const targetScale = 1;
    const step = 0.01;

    zoomImage.style.transform = `scale(${initialScale})`;

    function fazerZoom() {
        let scale = parseFloat(zoomImage.style.transform.replace('scale(', '').replace(')', ''));
        scale = Math.max(scale - step, targetScale);
        zoomImage.style.transform = `scale(${scale})`;
        if (scale > targetScale) {
            requestAnimationFrame(fazerZoom);
        }
    }

    requestAnimationFrame(fazerZoom);
});
