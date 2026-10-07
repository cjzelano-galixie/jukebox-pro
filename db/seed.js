import db from "#db/client";

import { createPlaylist } from "#db/queries/playlists";
import { createPlaylistTrack } from "#db/queries/playlists_tracks";
import { createTrack } from "#db/queries/tracks";
import { createUser } from "#db/queries/users";

await db.connect();
await seed();
await db.end();
console.log("🌱 Database seeded.");

async function seed() {
  for (let i = 1; i <= 20; i++) {
    const user = await createUser(`user${i}`, `password${i}`);

    await createPlaylist(
      "Playlist " + i,
      "lorem ipsum playlist description",
      user.id,
    );
    await createTrack("Track " + i, i * 50000);
  }

  for (let trackId = 1; trackId <= 5; trackId++) {
    await createPlaylistTrack(1, trackId);
  }

  for (let trackId = 6; trackId <= 10; trackId++) {
    await createPlaylistTrack(2, trackId);
  }

  for (let i = 11; i <= 20; i++) {
    const playlistId = 3 + Math.floor((i - 11) / 2);
    await createPlaylistTrack(playlistId, i);
  }
}
