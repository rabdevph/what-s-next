export default function clickNavListItems() {
  const navListItems = document.querySelectorAll('.navList__item');
  navListItems.forEach((navListItem) => {
    navListItem.addEventListener('click', () => {
      //
      console.log(navListItem);
    });
  });
}
