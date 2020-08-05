import db from "../database/connection";
import { convertHoursToMinutes } from "../utils/convertHoursToMinutes";
import { Request, Response } from "express";

interface ScheduleItem {
  week_day: Number;
  from: String;
  to: String;
}

export default class ClassesController {
  async index(resquest: Request, response: Response) {
    const filters = resquest.query;

    if (!filters.week_day || !filters.subject || !filters.time)
      return response
        .status(400)
        .json({ erro: "Missing filters to search clases" });

    const timeInMinutes = convertHoursToMinutes(filters.time as string);

    const classes = await db("classes")
      .whereExists(function () {
        this.select("class_schedule.*")
          .from("class_schedule")
          .whereRaw("class_schedule.class_id = classes.id")
          .whereRaw("class_schedule.week_day = ??", Number(filters.week_day))
          .whereRaw("class_schedule.from <= ??", timeInMinutes)
          .whereRaw("class_schedule.to > ??", timeInMinutes);
      })
      .where("classes.subject", "=", filters.subject as string)
      .join("users", "classes.user_id", "=", "users.id")
      .select(["classes.*", "users.*"]);

    return response.json(classes);
  }

  async store(resquest: Request, response: Response) {
    const {
      name,
      avatar,
      whatsapp,
      bio,
      subject,
      cost,
      schedule,
    } = resquest.body;

    const trx = await db.transaction();
    try {
      const insertedUsersIds = await trx("users").returning("id").insert({
        name,
        avatar,
        whatsapp,
        bio,
      });

      const user_id = insertedUsersIds[0];

      const insertedClassIds = await trx("classes").returning("id").insert({
        subject,
        cost,
        user_id,
      });

      const class_id = insertedClassIds[0];

      const classSchedule = schedule.map((scheduleItem: ScheduleItem) => {
        return {
          class_id,
          week_day: scheduleItem.week_day,
          from: convertHoursToMinutes(scheduleItem.from),
          to: convertHoursToMinutes(scheduleItem.to),
        };
      });

      await trx("class_schedule").insert(classSchedule);

      await trx.commit();

      return response.status(201).send();
    } catch (error) {
      await trx.rollback();
      return response
        .status(400)
        .json({ erro: "Unexpected error while creating new class" });
    }
  }
}
