export const ErrorPage = () => {
  return (
    <div className="px-4 text-center">
      <h2>Uh Oh!</h2>
      <h4>Sembra che la pagina che tu stia cercando non esista.</h4>
      <p>
        Potresti aver digitato un url sbagliato, nel frattempo, prova di nuovo
        oppure{" "}
        <a className="text-decoration-underline text-primary link-underline-primary" href="/">
          torna alla home
        </a>
      </p>
      <img
        className="my-2"
        src="https://media.tenor.com/U5QXJDAXq_AAAAAj/erro.gif"
        alt=""
        width={300}
      />
      <p className="">Error</p>
    </div>
  );
};
