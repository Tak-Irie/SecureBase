import { UniqueEntityId } from '../domain/UniqueEntityId';

export interface IDomainEvent {
  dateTimeOccurred: Date;
  getAggregateId(): UniqueEntityId;
}
