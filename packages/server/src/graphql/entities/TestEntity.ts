import { ObjectType, Field, Directive } from 'type-graphql';
import { Entity, Column, PrimaryColumn } from 'typeorm';

@ObjectType()
@Entity()
export class TestEntity {
  @Field()
  @PrimaryColumn()
  id: string;

  @Directive('@hasRole(role: "admin")')
  @Field()
  @Column()
  adminField: string;

  @Directive('@hasRole(role: "developer")')
  @Field()
  @Column()
  developerField: string;

  @Directive('@hasRole(role: ["admin", "developer"])')
  @Field()
  @Column()
  adminAndDeveloperField: string;
}
