# Sobre

Este projeto foi criado como referência para a implementação do "SSL Pinning" nas plataformas Android e IOS.

Apesar de ser possível habilitar este recurso através do uso de bibliotecas, o mais indicado é realizar a configuração diretamente na camada nativa do projeto para ter compatibilidade com a biblioteca "Axios".

O "SSL Pinning" é utilizado para melhorar a segurança dos serviços que confiam em certificados SSL. Ele permite especificar uma identidade na aplicação adicionando uma camada de segurança na comunicação com o servidor, evitando ataques como o "(MITM) Man in the middle"

# Configuração

**1 - EXTRAIR CHAVE PÚBLICA DO CERTIFICADO**

O primeiro passo é extrair a chave pública a partir do certificado, isto pode ser feito de duas formas:

**1.1 -  Extrair a partir do certificado (arquivo)**

Executar o script do arquivo presente na raíz "get-public-key.py" em um certificado, ex:

python get-public-key.py nome-do-certificado.cert

Ao finalizar será exibido a chave pública que deverá ser utilizada na configuração da aplicação

**1.2 -  Extrair a partir de um endereço (OpenSSL)**

Executar o script abaixo, no terminal, consultando o endereço em que o certificado está presente (substituir o "endereco.com.br"):

openssl s_client -servername endereco.com.br -connect endereco.com.br:443 | openssl x509 -pubkey -noout | openssl pkey -pubin -outform der | openssl dgst -sha256 -binary | openssl enc -base64

Ao finalizar será exibido a chave pública que deverá ser utilizada na configuração da aplicação


**1.2 - ANDROID**

O Android utiliza o cliente OkHttp para realizar as requisições HTTP, essa biblioteca tem suporte nativo ao SSL Pinning, desta forma, ao ser configurado a chave pública, todas as requisições indicadas estarão protegidas.

**1.2.1 - Criar arquivo de configuração**

Deverá ser criado um arquivo de configuração dentro da pasta "android/app/srcmain/java/com/[nome-aplicacao]". Neste arquivo, deve ser parametrizado a biblioteca OkHttp com a chave pública gerada a partir do certificado. Neste projeto, foi criado o arquivo "SSLPinnerFactory.java" como referência com comentários indicando os ajustes necessários.

**1.2.2 - Importar arquivo de configuração no projeto**

No arquivo "MainActivity.java" deverá ser configurado o "provider" da biblioteca OkHttp passando o serviço criado no passo anterior. No arquivo, foram adicionados comentários indicando os ajustes necessários.

**1.3 - IOS**

No IOS é necessário instalar a biblioteca "TrustKit" para configurar as políticas de segurança através do "SSL Pinning".

**1.3.1 - Instalar a biblioteca TrustKit**

No arquivo ios/PodFile, adicionar: 'TrustKit' e depois executar o comando "pod install" dentro da pasta "ios". (No projeto está implementado como referência)

**1.3.2 - Configurar a chave pública**

A chave pública deve ser configurada no arquivo "ios/[nome-aplicacao]/AppDelegate.m". No projeto, foram adicionados comentários indicando as configurações necessárias.

A biblioteca exige que pelo menos duas chaves públicas sejam configuradas. No arquivo de referência, para a segunda chave está sendo fornecido um valor "fake" como chave backup para não quebrar o "build" da aplicação. Isto acontece, pois é considerado uma boa prática ter uma chave backup em caso de o certificado ser gerado por alguma outra autoridade, evitando a necessitade de um novo deploy de forma inesperada.

# Como testar

Para testar, basta gerar o build a aplicação e clicar no botão "Carregar conteúdo" na página "Transações. Ele deve funcionar caso a chave for válida e bloquear a requisição caso a chave for inválida.

Obs: No IOS, toda ver que for alterada a chave é preciso desinstalar e instalar a aplicação, pois e feito o cache da última configuração.