import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';

@Injectable()
export class ExampleSubscriber {
  @OnEvent('example.created')
  handleExampleCreated(payload: any) {
    // TODO: handle event
  }
}