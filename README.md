# VittaAgenda

Agenda de atendimentos para clínicas e consultórios — implantação com GitHub e Vercel.

## Visão geral
O sistema permite **cadastrar, editar e excluir** consultas, além de **filtrar** por texto, status e data. Os dados são persistidos no **navegador (localStorage)** para fins de demonstração.

## Funcionalidades
- CRUD de consultas (modal de cadastro/edição)
- Filtros por busca, status e data
- Persistência local (localStorage)
- Páginas: Início, Consultas, Contato
- Layout responsivo

## Tecnologias
- HTML, CSS, JavaScript (sem framework)
- Git/GitHub para versionamento
- Vercel para deploy

## Como rodar localmente
```bash
git clone https://github.com/alexvndre01/vittaagenda.git
cd vittaagenda
# abra index.html ou rode um servidor local (opcional):
python -m http.server 8080
```

## Domínio (simulação)
Provedores: Hostinger  
Endereço URL: https://www.vittaagenda.com.br
<img src="dominio.png" alt="Minha imagem legal" />

## Não implementado (próximos passos)
- Multiusuário e autenticação
- Integração com banco e API
- Notificações por e-mail/WhatsApp

## Links
- GitHub: https://github.com/alexvndre01/vittaagenda
- Vercel: https://vittaagenda.vercel.app
