function getMovieData() {
  const sections = [
    {
      title: "Fun Tamil Movies",
      items: [
        { name: "Boss Engira Baskaran" },
        { name: "Indru Netru Naalai" },
        { name: "Kalakalappu" },
        { name: "Soodhu Kavvum" },
        { name: "Nanban" },
      ],
    },
    {
      title: "Suspenseful Tamil Thrillers",
      items: [
        { name: "Vettaiyaadu Vilaiyaadu" },
        { name: "Ratsasan" },
        { name: "Thani Oruvan" },
        { name: "Vishwaroopam" },
        { name: "Anjaam Pathiraa" },
      ],
    },
    {
      title: "Continue Watching for You",
      items: [
        { name: "Vikram" },
        { name: "Leo" },
        { name: "Kaithi" },
        { name: "Maanaadu" },
        { name: "Jailer" },
      ],
    },
  ];

  const allMovies = sections.flatMap((section) =>
    section.items.map((item) => ({
      ...item,
      section: section.title,
    }))
  );

  return { sections, allMovies };
}

export default getMovieData; 