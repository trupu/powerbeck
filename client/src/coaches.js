const CoachesArray = [];

class Coach {
    constructor(name) {
        this.name = name;
    }

    setInformation(url, description, quotation, about) {
        this.url = url;
        this.description = description;
        this.quotation = quotation;
        this.about = about;

        CoachesArray.push(this);
    }
}

const jennifer = new Coach('Jennifer Lawrence');
const michal = new Coach('Michal Karmowski');
const will = new Coach('Will Smith');

jennifer.setInformation('img/trener1.jpg', 'Trener Personalny', 'Cytat', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer eget turpis massa.');
michal.setInformation('img/trener2.jpg', 'Trener Personalny, Kulturysta', 'Co się z Tobą dzieje, skąd to zwątpienie?', 'eget ex sagittis tempor ut a nunc. Proin ullamcorper quam ut nisl tincidunt lacinia. Nulla mi ex, faucibus a quam et, congue lobortis enim. Fusce lobortis elit nulla, in rutrum est pellentesque ut. In in dapibus nulla.');
will.setInformation('img/trener3.jpg', 'Trener sztuk walki', 'Dostawiając codziennie jedną idealnie położoną cegłę, po jakimś czasie już masz cały, solidny mur', 'In hac habitasse platea dictumst. Vivamus sit amet sapien rutrum, sodales enim sit amet, tincidunt arcu. Duis placerat risus quam, eget pellentesque eros malesuada non.');


export default { CoachesArray };
