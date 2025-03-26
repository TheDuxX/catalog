const PrivacyPolicy = () => {
    return (
      <div className="w-full flex flex-col justify-center items-center my-5 px-4">
        <div className="max-w-3xl text-justify space-y-6">
          <h2 className="text-3xl font-bold text-center mb-6">Política de Privacidade</h2>
          
          <section>
            <h3 className="text-xl font-semibold">1. Introdução</h3>
            <p>
              Bem-vindo(a) ao site da <span className="font-bold">Tratorino</span>! Sua privacidade é importante para nós. 
              Esta Política de Privacidade explica como coletamos, usamos e protegemos suas informações.
            </p>
          </section>
          
          <section>
            <h3 className="text-xl font-semibold">2. Informações Coletadas</h3>
            <ul className="list-disc pl-5 space-y-2">
              <li>
                <strong>Dados fornecidos pelo usuário:</strong> Nome, e-mail, telefone, entre outros,
                quando você preenche formulários em nosso site.
              </li>
              <li>
                <strong>Dados de navegação:</strong> Endereço IP, tipo de navegador, páginas visitadas, tempo
                de permanência e cookies.
              </li>
            </ul>
          </section>
  
          <section>
            <h3 className="text-xl font-semibold">3. Uso das Informações</h3>
            <ul className="list-disc pl-5 space-y-2">
              <li>Melhorar a experiência do usuário no site.</li>
              <li>Enviar comunicações relevantes, caso autorizado.</li>
              <li>Análise de estatísticas e segurança do site.</li>
              <li>Cumprimento de obrigações legais.</li>
            </ul>
          </section>
          
          <section>
            <h3 className="text-xl font-semibold">4. Compartilhamento de Dados</h3>
            <p>
              Não vendemos nem compartilhamos seus dados pessoais com terceiros, exceto:
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li>Quando necessário para fornecer serviços solicitados por você.</li>
              <li>Para cumprir determinações legais e regulatórias.</li>
            </ul>
          </section>
          
          <section>
            <h3 className="text-xl font-semibold">5. Uso de Cookies</h3>
            <p>
              Nosso site pode utilizar cookies para melhorar sua experiência. Você
              pode configurar seu navegador para recusar cookies, mas algumas funcionalidades podem ser afetadas.
            </p>
          </section>
          
          <section>
            <h3 className="text-xl font-semibold">6. Direitos do Usuário</h3>
            <ul className="list-disc pl-5 space-y-2">
              <li>Solicitar acesso, correção ou exclusão de seus dados pessoais.</li>
              <li>Optar por não receber e-mails promocionais.</li>
              <li>Solicitar mais informações sobre como seus dados são usados.</li>
            </ul>
          </section>
          
          <section>
            <h3 className="text-xl font-semibold">7. Segurança das Informações</h3>
            <p>
              Adotamos medidas de segurança para proteger suas informações, mas nenhum sistema é 100% seguro. 
              Caso haja qualquer incidente de segurança, tomaremos as providências necessárias.
            </p>
          </section>
  
          <section>
            <h3 className="text-xl font-semibold">8. Alterações nesta Política</h3>
            <p>
              Podemos atualizar esta Política de Privacidade periodicamente.
              Recomendamos que você revise este documento regularmente.
            </p>
          </section>
  
          <section>
            <h3 className="text-xl font-semibold">9. Contato</h3>
            <p>
              Se tiver dúvidas sobre esta Política de Privacidade, entre em contato pelo e-mail:
              <span className="italic"> contato@tratorino.com.br</span>.
            </p>
          </section>
        </div>
      </div>
    );
  };
  
  export default PrivacyPolicy;
  