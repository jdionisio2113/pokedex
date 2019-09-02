import React from "react";

const Statistics = function({ stats }) {
    return (
        <div className="stats-wrapper">
            <h3>BASE STATS</h3>
            {stats.map((stat, index) => {
                var statNumber = stat.base_stat;
                var stat_title = stat.stat.name;
                var speed = "";
                var specialDefense = "";
                var specialAttack = "";
                var defense = "";
                var attack = "";
                var hp = "";

                switch (stat_title) {
                    case "speed":
                        speed = statNumber + "px";

                    case "special-defense":
                        specialDefense = statNumber + "px";

                    case "special-attack":
                        specialAttack = statNumber + "px";

                    case "defense":
                        defense = statNumber + "px";

                    case "attack":
                        attack = statNumber + "px";

                    case "hp":
                        hp = statNumber + "px";

                    default:
                }

                return (
                    <div className="stats-container" key={index}>
                        <p className="stats">{stat_title}:</p>
                        <div className="meter">
                            <span
                                className="width"
                                style={{
                                    width: speed,
                                    width: specialDefense,
                                    width: specialAttack,
                                    width: attack,
                                    width: defense,
                                    width: hp
                                }}
                            />
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default Statistics;
