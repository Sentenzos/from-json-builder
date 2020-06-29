function deleteCopies(obj) {
  if (!obj.content) return;
  for (let i = 0; i < obj.content.length; i++) {

    const isFirst = obj.content[i].type !== obj.content[i - 1]?.type ||
      obj.content[i].id !== obj.content[i - 1]?.id;

    //Если оригинальный объект был удален и на его месте копия, то копия становится оригиналом
    if (isFirst) {
      if (obj.content[i]._copy) {
        obj.content[i]._copy = false;
      }
    }
    //Если объект копия, то он удаляется
    if (obj.content[i]._copy) {
      obj.content.splice(i, 1);
      i--
      //Если не копия, то проверить его массив content
    } else {
      deleteCopies(obj.content[i]);
    }
  }
}

export default deleteCopies;