export default function About() {
  return (
    <>
      <p>
        Здесь вы можете по контекстно-свободной LR(1) граматике построить
        конечный детерминированный автомат.
      </p>
      <p>
        После нажатия на кнопку “Создать автомат” появится поле с возможностью
        ввести грамматику, ее надо указывать в формате:
      </p>
      <ul>
        <li> S -> AbcD</li>
        <li> A -> BC</li>
        <li> T -> $, $ - соответствует пустой строке</li>
      </ul>

      <p>
        Зарегистрировавшись на сайте вы получите возможность сохранять свои
        автоматы, чтобы продолжить их исследование в дальнейшем.
      </p>
      <p>........</p>
    </>
  );
}