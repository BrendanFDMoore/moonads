import { Identity } from '../identity';
import { Maybe } from '../maybe';
import { Either } from '../either';
import { Transform } from '../utils/transform';

describe('Apply Rules', () => {
  const double = x => 2 * x;
  const addFour = x => x + 4;
  const curriedCompose = f => g => x => f(g(x));

  const appliesUnderTest = [
    { a: Identity.of(addFour), u: Identity.of(double), v: Identity.of(7) },
    { a: Maybe.of(addFour), u: Maybe.of(double), v: Maybe.of(7) },
    { a: Maybe.of(addFour), u: Maybe.of(double), v: Maybe.of<number>(null) },
    { a: Maybe.of(addFour), u: Maybe.of(double), v: Maybe.of<number>(undefined) },
    { a: Maybe.of<Transform<number, number>>(null), u: Maybe.of(double), v: Maybe.of(7) },
    { a: Maybe.of(addFour), u: Maybe.of<Transform<number, number>>(undefined), v: Maybe.of(7) },
    { a: Either.right(addFour), u: Either.right(double), v: Either.right(7) },
    { a: Either.left(addFour), u: Either.left(double), v: Either.left(7) },
    { a: Either.right(addFour), u: Either.right(double), v: Either.left(7) },
    { a: Either.right(addFour), u: Either.left(double), v: Either.left(7) },
    { a: Either.left(addFour), u: Either.left(double), v: Either.right(7) },
    { a: Either.left(addFour), u: Either.right(double), v: Either.right(7) },
    { a: Either.left(addFour), u: Either.right(double), v: Either.left(7) },
  ];

  // v.ap(u.ap(a.map(f => g => x => f(g(x))))) == v.ap(u).ap(a)
  it('satisfies the composition rule', () =>
    appliesUnderTest.forEach(({ a, u, v }) => expect(
      v.ap(u.ap(a.map(curriedCompose)))
      .equals(
        v.ap(u).ap(a))).toBe(true)));
});
