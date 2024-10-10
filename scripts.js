const uploadBtn = document.getElementById("upload-btn");
const inputUpload = document.getElementById("imagem-upload");
const uploadBtnDestaque = document.getElementById("link-destaque");
const checkPublicado = document.getElementById("publicado");

uploadBtn.addEventListener("click", () => {
    inputUpload.click();
});

uploadBtnDestaque.addEventListener("click", () => {
    inputUpload.click();
});

function lerConteudoArquivo(arquivo) {
    return new Promise((resolve, reject) => {
        const leitor = new FileReader();
        leitor.onload = () => {
            resolve({ url: leitor.result, nome: arquivo.name });
        };

        leitor.onerror = () => {
            reject(`Erro na leitura do arquivo ${arquivo.name} `);
        };

        leitor.readAsDataURL(arquivo);
    });
}

const imagemPrincipal = document.querySelector(".main-imagem");
const nomeDaImagem = document.querySelector(".container-imagem-nome p");

inputUpload.addEventListener("change", async (event) => {
    const arquivo = event.target.files[0];

    if (arquivo) {
        try {
            const conteudoDoArquivo = await lerConteudoArquivo(arquivo);
            imagemPrincipal.src = conteudoDoArquivo.url;
            nomeDaImagem.textContent = conteudoDoArquivo.nome;
        } catch (erro) {
            console.error("Erro na leitura do arquivo");
        }
    }
});

const inputTags = document.getElementById("input-tags");
const listaTags = document.getElementById("lista-tags");

listaTags.addEventListener("click", (evento) => {
    if (evento.target.classList.contains("remove-tag")) {
        const tagParaRemover = evento.target.parentElement;
        if (tagParaRemover) {
            listaTags.removeChild(tagParaRemover);
        }
    }
});

const tagsDisponiveis = [
    "Front-end",
    "Back-end",
    "Programação",
    "DataScience",
    "Full-stack",
    "HTML",
    "CSS",
    "JavaScript",
];

async function verificaTagsDisponiveis(tagTexto) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(tagsDisponiveis.includes(tagTexto));
        }, 1000);
    });
}

inputTags.addEventListener("keypress", async (evento) => {
    if (evento.key === "Enter") {
        evento.preventDefault();
        const tagTexto = inputTags.value.trim();
        if (tagTexto) {
            try {
                const tagExiste = await verificaTagsDisponiveis(tagTexto);
                if (tagExiste) {
                    const tagNova = document.createElement("li");
                    tagNova.innerHTML = `<p>${tagTexto}</p> <img src="./img/close-black.svg" class="remove-tag">`;
                    listaTags.appendChild(tagNova);
                    inputTags.value = "";
                } else {
                    alert(`Essa tag não foi encontrada. Tags disponiveis: ${tagsDisponiveis}`);
                }
            } catch (error) {
                console.error("Erro na verificação da tag.", error);
                alert("Erro na verificação da tag. Verifique o console.");
            }
        }
    }
});

const botaoPublicar = document.querySelector(".botao-publicar");

async function publicarProjeto(nomeDoProjeto, descricaoProjeto, tagsProjeto) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const deuCerto = Math.random() > 0.3;

            if (deuCerto) {
                resolve("Projeto publicado com sucesso");
            } else {
                reject("Error 804: Erro ao publicar o projeto ao banco de dados. (erro ficticio)");
            }
        });
    }, 2000);
}

botaoPublicar.addEventListener("click", async (evento) => {
    evento.preventDefault();

    const nomeDoProjeto = document.getElementById("nome").value;
    const descricaoDoProjeto = document.getElementById("descricao").value;
    const tagsProjeto = Array.from(listaTags.querySelectorAll("p")).map((tag) => tag.textContent);

    try {
        const resultado = await publicarProjeto(nomeDoProjeto, descricaoDoProjeto, tagsProjeto);
        console.log(resultado);

        uploadBtn.style.display = "none";
        checkPublicado.style.display = "block";

        alert("Deu tudo certo! Projeto publicado.");
    } catch (error) {
        console.log(error);
        alert('Erro inesperado, na publicação. Leia o "console" para verificar o erro.');
    }
});

const botaoDescartar = document.querySelector(".botao-descartar");

botaoDescartar.addEventListener("click", (evento) => {
    evento.preventDefault();

    const formulario = document.querySelector("form");
    formulario.reset();

    imagemPrincipal.src = "./img/imagem1.png";
    nomeDaImagem.textContent = "image_projeto.png";

    listaTags.innerHTML = "";

    uploadBtn.style.display = "block";
    checkPublicado.style.display = "none";
});
