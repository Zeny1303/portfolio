import "./Speaker.css";

export default function Speaker() {

  // Create an array of 37 elements.
  // We'll use it to render 37 speaker holes.

  const holes = Array.from({ length: 40 });

  return (

    <div className="speaker-box">

      {/* Every hole gets its own div */}

      {holes.map((_, index) => (

        <div
          key={index}
          className="speaker-hole"
        />

      ))}

    </div>

  );

}