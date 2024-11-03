import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { MemberCreateVo } from './vo/member-create.vo';
import { Content } from '../content/content.entity';

@Entity('members')
export class Member {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', nullable: false })
  userId: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  // @OneToMany(() => Content, (content) => content.member)
  // contents: Content[];

  static from(vo: MemberCreateVo) {
    const memberEntity = new Member();
    memberEntity.userId = vo.userId;
    memberEntity.createdAt = new Date();
    memberEntity.updatedAt = new Date();
    return memberEntity;
  }
}
