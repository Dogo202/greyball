import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { EventService } from './event.service';
import { Event } from './event.entity';
import { CreateEventInput } from './dto/create-event.input';
import { UpdateEventInput } from './dto/update-event.input';

@Resolver(() => Event)
export class EventResolver {
    constructor(private readonly eventService: EventService) {}

    @Query(() => [Event])
    events() {
        return this.eventService.findAll();
    }

    @Query(() => Event)
    event(@Args('id', { type: () => Int }) id: number) {
        return this.eventService.findOne(id);
    }

    @Mutation(() => Event)
    createEvent(@Args('input') input: CreateEventInput) {
        return this.eventService.create(input);
    }

    @Mutation(() => Event)
    updateEvent(@Args('input') input: UpdateEventInput) {
        return this.eventService.update(input);
    }

    @Mutation(() => Int)
    removeEvent(@Args('id', { type: () => Int }) id: number) {
        return this.eventService.remove(id);
    }
}
