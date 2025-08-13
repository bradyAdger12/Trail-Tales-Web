import { AVAILABLE_CHARACTERS, type CharacterTemplate } from "~/api/character"
import CharacterStat from "./CharacterStat"
import { FOOD_COLOR, HEALTH_COLOR, WATER_COLOR } from "~/lib/colors"
import { useEffect, useState } from "react"

export default function CharacterSelector({ onSelect }: { onSelect: (character: CharacterTemplate) => void }) {
    const [selectedCharacter, setSelectedCharacter] = useState<CharacterTemplate | null>(null)
    useEffect(() => {
        if (selectedCharacter) {
            onSelect(selectedCharacter)
        }
    }, [selectedCharacter])
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
            {AVAILABLE_CHARACTERS.map((character) => (
                <div key={character.name} className="bg-white rounded-xl p-6 border-3 cursor-pointer hover:shadow-lg hover:scale-102 transition-all duration-300" style={{ color: character.color, borderColor: selectedCharacter?.name === character.name ? character.color : "transparent" }} onClick={() => setSelectedCharacter(character)}>
                    <div className="text-center mb-4">
                        <h3 className="text-2xl font-bold">{character.name}</h3>
                    </div>
                    <div className="mb-4">
                        <div className="text-sm font-semibold text-gray-700 mb-3 text-center">Starting Stats</div>
                        <div className="space-y-2">
                            <CharacterStat stat={character.health} color={HEALTH_COLOR} icon="fas fa-heart" />
                            <CharacterStat stat={character.food} color={FOOD_COLOR} icon="fas fa-utensils" />
                            <CharacterStat stat={character.water} color={WATER_COLOR} icon="fas fa-water" />
                        </div>
                    </div>
                    <p className="text-sm text-gray-600 text-center leading-relaxed">{character.description}</p>
                </div>
            ))}
        </div>
    )
}