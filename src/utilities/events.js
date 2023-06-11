export function clickNavListItems() {
  const navListItems = document.querySelectorAll('.navList__item');
  navListItems.forEach((navListItem) => {
    navListItem.addEventListener('click', () => {
      //
      console.log(navListItem);
    });
  });
}

export function clickNewProject() {
  const newProjectButton = document.getElementById('newProjectButton');
  newProjectButton.addEventListener('click', () => {
    // hide new project button
    // show new project form
    // console.log(newProjectButton.id);
  });
}
