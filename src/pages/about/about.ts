import { helpCreateEl } from '../global/global';
import foto1 from '../../assets/images/we/foto1.png';
import foto2 from '../../assets/images/we/foto2.png';
import foto3 from '../../assets/images/we/foto3.png';
import git from '../../assets/images/gitSvg1.svg';
import rss from '../../assets/images/rs-school.png';

export function createAboutUsPage() {
    const mainTag = document.querySelector('.main') as HTMLElement;
    mainTag.innerHTML = '';
    const sectionAbout = helpCreateEl('section', 'about');
    const sectionAboutContainer = helpCreateEl('div', 'about-container');
    const aboutUsTitle = helpCreateEl('h1', 'main-title');
    mainTag.append(aboutUsTitle, sectionAbout);
    sectionAbout.append(sectionAboutContainer);

    aboutUsTitle.textContent = 'About US';

    const developer1 = helpCreateEl('div', 'developers-contain');
    const developer2 = helpCreateEl('div', 'developers-contain');
    const developer3 = helpCreateEl('div', 'developers-contain');

    const Galiia = helpCreateEl('div', 'developer');
    const Vlad = helpCreateEl('div', 'developer');
    const Grig = helpCreateEl('div', 'developer');

    sectionAboutContainer.append(developer1, developer2, developer3);

    const fotoGaliia = helpCreateEl('img', 'developers-foto') as HTMLImageElement;
    fotoGaliia.src = foto1;
    const fotoVlad = helpCreateEl('img', 'developers-foto') as HTMLImageElement;
    fotoVlad.src = foto2;
    const fotoGrig = helpCreateEl('img', 'developers-foto') as HTMLImageElement;
    fotoGrig.src = foto3;

    Galiia.append(fotoGaliia);
    Vlad.append(fotoVlad);
    Grig.append(fotoGrig);

    const titleDev1 = helpCreateEl('h3', 'developers-title');
    const titleDev2 = helpCreateEl('h3', 'developers-title');
    const titleDev3 = helpCreateEl('h3', 'developers-title');

    titleDev1.textContent = 'Galiia Gusamutdinova team-lead developer ';
    titleDev2.textContent = 'Vladislav Shkvarun developer ';
    titleDev3.textContent = 'Gregory Yakhontov developer ';

    const link1 = helpCreateEl('a', 'git-link');
    const link2 = helpCreateEl('a', 'git-link');
    const link3 = helpCreateEl('a', 'git-link');

    link1.innerHTML = `<a href="https://github.com/Galiia-GR" target="_blank">
    <img src="${git}" width="25" height="25" alt="github"
/></a>`;
    link2.innerHTML = ` <a href="https://github.com/vlad-shkv" target="_blank">
    <img src="${git}" width="25" height="25" alt="github"
/></a>`;
    link3.innerHTML = `<a href="https://github.com/gregoryrubies" target="_blank">
    <img src="${git}" width="25" height="25" alt="github"
/></a>`;

    titleDev1.appendChild(link1);
    titleDev2.appendChild(link2);
    titleDev3.appendChild(link3);

    const titleContr1 = helpCreateEl('h5', 'developers-bio');
    titleContr1.textContent = 'Contribution to the project:';
    const titleContr2 = helpCreateEl('h5', 'developers-bio');
    titleContr2.textContent = 'Contribution to the project:';
    const titleContr3 = helpCreateEl('h5', 'developers-bio');
    titleContr3.textContent = 'Contribution to the project:';

    const descripBio1 = helpCreateEl('p', 'developers-description');
    const descripBio2 = helpCreateEl('p', 'developers-description');
    const descripBio3 = helpCreateEl('p', 'developers-description');

    descripBio1.textContent =
        "I am actively engaged in studying JavaScript at the Rolling Scopes School, where I'm improving my skills. My passion is web development, and I'm dedicated to continuous learning. I aim to fully immerse myself in development, explore architectural concepts, and leverage cutting-edge technologies to create high-quality applications. My goal is to become an experienced frontend developer.";

    descripBio2.textContent =
        "I only managed to finish high school in Ukraine and immediately moved to Italy. I'm currently studying at RollingScopes to become a junior front-end developer. I love it and I am not going to stop there. I have a curiosity for delving into the architecture of web applications. My plans are to study frameworks and look for a job. I really hope for success.";
    descripBio3.textContent =
        'Currently, I work as a database developer for analytical systems. My job involves developing database functionality for BI systems. In the future, I plan to familiarize myself with the key technologies of frontend and backend development. I am interested in studying the architecture of web applications. My goal is to become a full-stack developer and find an exciting job where I can fully unleash my potential.';

    const descripContr1 = helpCreateEl('p', 'developers-description');
    const descripContr2 = helpCreateEl('p', 'developers-description');
    const descripContr3 = helpCreateEl('p', 'developers-description');

    descripContr1.textContent =
        "I coordinated team work, created the project's design, actively engaged in architectural discussions, decision-making, and acquired substantial expertise in handling APIs and e-commerce platforms.";
    descripContr2.textContent =
        'I hold the role of an API worker in our project, actively contributing to its development. This experience has equipped me with extensive expertise in working with APIs and e-commerce platforms.';
    descripContr3.textContent =
        'I introduced scrum to our project. I was part of the project development and gained extensive experience with APIs and e-commerce platforms.';

    developer1.append(Galiia, titleDev1, descripBio1, titleContr1, descripContr1);
    developer2.append(Vlad, titleDev2, descripBio2, titleContr2, descripContr2);
    developer3.append(Grig, titleDev3, descripBio3, titleContr3, descripContr3);

    const rssSection = helpCreateEl('div', 'rss-description');

    document.querySelector('.about')?.appendChild(rssSection);

    rssSection.innerHTML = `<p> <a class="RSS" href="https://rs.school/js/" target="blank">
              <img src="${rss}" width="100" alt="RS School" />
          </a>  This project, developed by RS School students, serves as a successful example of collaborative creative processes and learning within the IT field.</p>`;

    const buble = helpCreateEl('div', 'buble');
    document.querySelector('.main')?.appendChild(buble);
    buble.innerHTML = `<div class="bublcontent">
    </div>
    <div class="bubl1"></div>
    <div class="bubl2"></div>
    <div class="bubl3"></div>
</div>`;

    document.querySelector('.main')?.appendChild(buble);
}
