import "./Content.css";
import getMovieData from "../Data/Data";

function Content() {
  const { sections } = getMovieData();
  return (
    <section className="content">
      {sections.map(({ title, items }) => (
        <div key={title} className="content__section">
          <header className="content__section-header">
            <h2>{title}</h2>
          </header>

          <div className="content__carousel">
            {items.map(({ name }) => (
              <article key={name} className="content__card">
                <h3>{name}</h3>
              </article>
            ))}
          </div>
        </div>
      ))}
    </section>
  );
}

export default Content;
