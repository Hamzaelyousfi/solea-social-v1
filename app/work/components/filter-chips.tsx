type SortOption = 'recents' | 'resultats' | 'az'

type FilterChipsProps = {
  categories: string[]
  activeCategory: string
  onCategoryChange: (category: string) => void
  sortOption: SortOption
  onSortChange: (option: SortOption) => void
}

const sortLabels: Record<SortOption, string> = {
  recents: 'Recents',
  resultats: 'Resultats',
  az: 'A-Z',
}

export default function FilterChips({
  categories,
  activeCategory,
  onCategoryChange,
  sortOption,
  onSortChange,
}: FilterChipsProps) {
  return (
    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
      <div className="flex flex-wrap gap-2">
        {categories.map((category) => {
          const isActive = category === activeCategory
          return (
            <button
              key={category}
              type="button"
              onClick={() => onCategoryChange(category)}
              className={`rounded-full border px-4 py-2 text-sm font-medium transition ${
                isActive
                  ? 'border-neutral-900 bg-neutral-900 text-white'
                  : 'border-neutral-200 bg-white text-neutral-700 hover:border-neutral-400'
              }`}
            >
              {category}
            </button>
          )
        })}
      </div>
      <div className="flex items-center gap-3">
        <span className="text-sm text-neutral-500">Trier par</span>
        <div className="relative">
          <select
            className="rounded-full border border-neutral-200 bg-white px-4 py-2 text-sm font-medium text-neutral-700 shadow-sm transition focus:border-neutral-400 focus:outline-none"
            value={sortOption}
            onChange={(event) => onSortChange(event.target.value as SortOption)}
            aria-label="Trier les projets"
          >
            {Object.entries(sortLabels).map(([value, label]) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  )
}
