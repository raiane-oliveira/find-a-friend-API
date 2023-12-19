export class InvalidPetEnergyError extends Error {
  constructor() {
    super('Invalid pet energy! Choose a number within the range from 0 to 5.')
  }
}
