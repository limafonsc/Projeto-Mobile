export interface Filme {
    id: string;
    titulo: string;
    ano: string;
    duracao: string;
    genero: string;
    nota: string;
    status: string;
    diretor: string;
    dataAdicionado: string;
    descricao: string;
    favoritado: boolean;
    imagem: string;
}

export const filmesCadastrados: Filme[] = [
    { 
        id: '1', 
        titulo: 'Duna', 
        ano: '2021', 
        duracao: '2h 35min',
        genero: 'Ficção Científica', 
        nota: '4.5', 
        status: 'Assistido',
        diretor: 'Denis Villeneuve',
        dataAdicionado: '10/01/2026',
        descricao: 'Paul Atreides viaja para o planeta mais perigoso do universo para garantir o futuro de sua família e de seu povo enquanto forças malévolas disputam o controle da substância mais preciosa do mundo.',
        favoritado: false, 
        imagem: require('../../assets/images/duna.jpg') 
    },
    { 
        id: '2', 
        titulo: 'Oppenheimer', 
        ano: '2023', 
        duracao: '3h 00min',
        genero: 'Drama', 
        nota: '5.0', 
        status: 'Assistido',
        diretor: 'Christopher Nolan',
        dataAdicionado: '15/11/2025',
        descricao: 'O papel do físico J. Robert Oppenheimer no desenvolvimento da bomba atômica durante a Segunda Guerra Mundial.',
        favoritado: true, 
        imagem: require('../../assets/images/oppenheimer.jpg')
    },
    { 
        id: '3', 
        titulo: 'Interestelar', 
        ano: '2014', 
        duracao: '2h 49min',
        genero: 'Ficção Científica, Aventura', 
        nota: '4.8', 
        status: 'Assistido',
        diretor: 'Christopher Nolan',
        dataAdicionado: '12/05/2024',
        descricao: 'Uma equipe de exploradores viaja através de um buraco de minhoca recém-descoberto para superar os limites das viagens espaciais humanas e conquistar as vastas distâncias interestelares.',
        favoritado: true, 
        imagem: require('../../assets/images/interestelar.webp')
    },
    { 
        id: '4', 
        titulo: 'O Poderoso Chefão', 
        ano: '1972', 
        duracao: '2h 55min',
        genero: 'Drama', 
        nota: '5.0', 
        status: 'Quero assistir',
        diretor: 'Francis Ford Coppola',
        dataAdicionado: '20/02/2026',
        descricao: 'O patriarca envelhecido de uma dinastia do crime organizado transfere o controle de seu império clandestino para seu filho relutante.',
        favoritado: true, 
        imagem: require('../../assets/images/opoderosochefao.jpg')
    },
    { 
        id: '5', 
        titulo: 'Forrest Gump', 
        ano: '1994', 
        duracao: '2h 22min',
        genero: 'Drama', 
        nota: '4.7', 
        status: 'Assistindo',
        diretor: 'Robert Zemeckis',
        dataAdicionado: '05/05/2025',
        descricao: 'As presidências de Kennedy e Johnson, os eventos do Vietnã, Watergate e outras histórias históricas se desenrolam através da perspectiva de um homem do Alabama.',
        favoritado: true, 
        imagem: require('../../assets/images/forrest.jpg')
    },
    { 
        id: '6', 
        titulo: 'Top Gun: Maverick', 
        ano: '2022', 
        duracao: '2h 10min',
        genero: 'Ação', 
        nota: '4.6', 
        status: 'Assistido',
        diretor: 'Joseph Kosinski',
        dataAdicionado: '14/07/2025',
        descricao: 'Após mais de trinta anos de serviço como um dos principais aviadores da Marinha, Pete Mitchell está onde pertence, quebrando os limites como um piloto de teste corajoso.',
        favoritado: true, 
        imagem: require('../../assets/images/topgun.jpg')
    },
    { 
        id: '7', 
        titulo: 'Clube da Luta', 
        ano: '1999', 
        duracao: '2h 19min',
        genero: 'Drama', 
        nota: '4.3', 
        status: 'Assistido',
        diretor: 'David Fincher',
        dataAdicionado: '01/03/2026',
        descricao: 'Um trabalhador de escritório insone e um fabricante de sabonetes despreocupado formam um clube de luta underground que evolui para algo muito maior.',
        favoritado: false, 
        imagem: require('../../assets/images/clube.jpg')
    },
    { 
        id: '8', 
        titulo: 'Pulp Fiction', 
        ano: '1994', 
        duracao: '2h 34min',
        genero: 'Policial, Drama', 
        nota: '4.7', 
        status: 'Assistido',
        diretor: 'Quentin Tarantino',
        dataAdicionado: '19/12/2025',
        descricao: 'As vidas de dois assassinos da máfia, um boxeador, a esposa de um gângster e um par de bandidos de restaurante se entrelaçam em quatro histórias de violência e redenção.',
        favoritado: true, 
        imagem: require('../../assets/images/pulp.jpg')
    },
    { 
        id: '9', 
        titulo: 'Batman: O Cavaleiro das Trevas', 
        ano: '2008', 
        duracao: '2h 32min',
        genero: 'Ação, Crime', 
        nota: '4.9', 
        status: 'Assistido',
        diretor: 'Christopher Nolan',
        dataAdicionado: '30/08/2025',
        descricao: 'Quando a ameaça conhecida como O Coringa surge de seu passado, ela causa estragos e caos no povo de Gotham.',
        favoritado: true, 
        imagem: require('../../assets/images/batman.jpg')
    },
    { 
        id: '10', 
        titulo: 'Um Sonho de Liberdade', 
        ano: '1994', 
        duracao: '2h 22min',
        genero: 'Drama', 
        nota: '4.8', 
        status: 'Assistido',
        diretor: 'Frank Darabont',
        dataAdicionado: '11/04/2025',
        descricao: 'Dois homens presos encontram redenção ao longo de vários anos, descobrindo consolo e eventuais atos de decência comum.',
        favoritado: true, 
        imagem: require('../../assets/images/umsonho.png')
    }
];
